#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkWorkshopStackHitCounter } from '../lib/cdk-workshop-stack';

const app = new cdk.App();
new CdkWorkshopStackHitCounter(app, 'CdkWorkshopStackHitCounter');
