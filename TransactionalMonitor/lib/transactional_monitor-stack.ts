import * as cdk from 'aws-cdk-lib';
import * as kinesis from 'aws-cdk-lib/aws-kinesis';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { KinesisEventSource } from 'aws-cdk-lib/aws-lambda-event-sources';
import { Construct } from 'constructs';

export class LiveTransactionMonitorStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. Create the Kinesis Stream (The Pire)
    const transactionStream = new kinesis.Stream(this, 'TransactionStream', {
      shardCount: 1, // Start small for learning

    });
    
    // 2. Create the Lambda Function (The The Worker)
    const processorLambda = new lambda.Function(this, 'TransactionProcessor', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'handler.handler',
      code: lambda.Code.fromAsset('lambda-functions'),
    });

    // 3. Connect them: Lambda "listens" to Kinesis
    processorLambda.addEventSource(new KinesisEventSource(transactionStream, {
      startingPosition: lambda.StartingPosition.LATEST,
      batchSize: 10,
    }));

    // Output the Stream Name so we can use it later
    new cdk.CfnOutput(this, 'StreamName', {value: transactionStream.streamName});
  }
}