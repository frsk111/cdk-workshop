import { aws_lambda } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface HitCounterProps {
  downstream: aws_lambda.IFunction
}

export class HitCounter extends Construct {
  constructor(scope: Construct, id: string, props: HitCounterProps) {
    super(scope, id);
    
    

  }
}
