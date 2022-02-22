import { DynamoDB } from "@aws-sdk/client-dynamodb";
import {Lambda} from "@aws-sdk/client-lambda";
import { APIGatewayProxyHandler } from "aws-lambda";

const dynamo = new DynamoDB({});
const lambda = new Lambda({});


export const handler: APIGatewayProxyHandler = async (event) => {
    
    console.log('request:', JSON.stringify( event, undefined, 2));

    await dynamo.updateItem({
        TableName: process.env.HITS_TABLE_NAME,
        Key: { path: { S: event.path } },
        UpdateExpression: 'ADD hits :incr',
        ExpressionAttributeValues: { ':incr': { N: '1'} }
    });

    // Chiama la funzione downstream e cattura la risposta
    const resp = await lambda.invoke({
        FunctionName: process.env.DOWNSTREAM_FUNCTION_NAME,
        Payload: Buffer.from(JSON.stringify(event)),
    });

    console.log('downstream response', JSON.stringify( resp, undefined, 2));

    return JSON.parse(Buffer.from(resp.Payload!).toString());    
    
  };


