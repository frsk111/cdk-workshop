import { Environment } from '@aws-sdk/client-lambda';
import { aws_dynamodb, aws_lambda, aws_lambda_nodejs } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export interface HitCounterProps {
  downstream: aws_lambda.IFunction
}

export class HitCounter extends Construct {
  
  public readonly handler: aws_lambda.Function;

  constructor(scope: Construct, id: string, props: HitCounterProps) {
    super(scope, id);
    
    // Definizione tabella db
    const table = new aws_dynamodb.Table(this,'Hits',{
      partitionKey: {name: 'Hits', type: aws_dynamodb.AttributeType.STRING}
    })

    // Definizione lambda function hitcounter.ts
    this.handler = new aws_lambda_nodejs.NodejsFunction(this,"HitCounterHandler",{
      runtime: aws_lambda.Runtime.NODEJS_14_X,
      entry: 'lambda/hitcounter.ts',
      handler: 'handler',
      environment: {
        HITS_TABLE_NAME: table.tableName,
        DOWNSTREAM_FUNCION_NAME: props.downstream.functionName
      }
    })

    // Diamo i permessi all'handler di lettura/scrittua sulla tabella
    table.grantReadWriteData(this.handler);

    // Diamo i permessi all'handler di invocare il downstream
    props.downstream.grantInvoke(this.handler);
  }
}
