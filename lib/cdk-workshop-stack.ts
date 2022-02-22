import { aws_apigateway, aws_lambda, aws_lambda_nodejs, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { HitCounter } from './hitcounter';

export class CdkWorkshopStackHitCounter extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    const hello = new aws_lambda_nodejs.NodejsFunction(this,"HelloHandler",{
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      entry: 'lambda/hello.ts',
      handler: 'handler'
    })

    //istanziamo il costrutto HitCounter
    const helloWithCounter = new HitCounter(this, 'HelloHitCounter',{
      downstream: hello
    })

    new aws_apigateway.LambdaRestApi(this,'Endpoint',{
      handler: helloWithCounter.handler
    })



  }
}
