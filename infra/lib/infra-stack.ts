import { Duration, Stack, StackProps, Tags } from 'aws-cdk-lib';
import { LambdaRestApi, SecurityPolicy } from 'aws-cdk-lib/aws-apigateway';
import {
  Certificate,
  DnsValidatedCertificate,
} from 'aws-cdk-lib/aws-certificatemanager';
import { Code, Function, LayerVersion, Runtime } from 'aws-cdk-lib/aws-lambda';
import { ARecord, HostedZone, RecordTarget } from 'aws-cdk-lib/aws-route53';
import { ApiGateway } from 'aws-cdk-lib/aws-route53-targets';
import { Construct, IConstruct } from 'constructs';
import { resolve } from 'path';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

const domain = 'ppay.me';
const appName = 'recruiter-web-api';
const url = `${appName}.${domain}`;

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    const zone = HostedZone.fromLookup(this, 'baseZone', {
      domainName: domain,
    });
    this.setTag(zone);

    const bffCertificate = new DnsValidatedCertificate(
      this,
      'BffDnsValidatedCertificate',
      {
        domainName: url,
        hostedZone: zone,
        region: 'us-east-1',
      },
    );
    this.setTag(bffCertificate);

    // pack all external deps in layer
    const lambdaLayer = new LayerVersion(this, 'HandlerLayer', {
      code: Code.fromAsset(resolve(__dirname, `../../dist/nodejs.zip`)),
      compatibleRuntimes: [Runtime.NODEJS_14_X],
      description: 'Api Handler Dependencies',
    });
    this.setTag(lambdaLayer);

    // add handler to respond to all our api requests
    const handler = new Function(this, 'Handler', {
      code: Code.fromAsset(resolve(__dirname, `../../dist`), {
        exclude: ['node_modules', 'nodejs', 'nodejs.zip'],
      }),
      handler: 'main.handler',
      runtime: Runtime.NODEJS_14_X,
      layers: [lambdaLayer],
      timeout: Duration.seconds(10),
    });
    this.setTag(handler);

    // add api resource to handle all http traffic and pass it to our handler
    const api = new LambdaRestApi(this, appName, {
      deploy: true,
      restApiName: url,
      handler,
      domainName: {
        domainName: url,
        certificate: Certificate.fromCertificateArn(
          this,
          `${url}-certificate`,
          bffCertificate.certificateArn,
        ),
        securityPolicy: SecurityPolicy.TLS_1_2,
      },
      defaultCorsPreflightOptions: {
        allowHeaders: ['Content-Type', 'Authorization', 'X-Api-Key'],
        allowMethods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
        allowCredentials: true,
        allowOrigins: ['*'],
      },
    });
    this.setTag(api);

    const record = new ARecord(this, 'BffARecord', {
      zone,
      recordName: url,
      target: RecordTarget.fromAlias(new ApiGateway(api)),
    });

    this.setTag(record);
  }

  private setTag(scope: IConstruct) {
    Tags.of(scope).add('Owner', 'PlataformaWeb');
  }
}
