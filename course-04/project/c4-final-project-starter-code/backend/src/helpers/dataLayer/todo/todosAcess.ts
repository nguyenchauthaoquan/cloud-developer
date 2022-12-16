import * as AWS from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../../../utils/logger'
import { TodoItem } from '../../../models/TodoItem'
import { TodoUpdate } from '../../../models/TodoUpdate';
import {AttachmentUtils} from "../../fileStorage/attachmentUtils";

const AWSXRay = require('aws-xray-sdk')

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')

const attachmentUtil = new AttachmentUtils()
// TODO: Implement the dataLayer logic
export class TodosAccess {
    todoDocument: DocumentClient;
    todoTable: string;
    todoCreatedAtIndex: string;

    constructor() {
        this.todoDocument = new XAWS.DynamoDB.DocumentClient()
        this.todoTable = process.env.TODO_TABLE
        this.todoCreatedAtIndex = process.env.TODOS_CREATED_AT_INDEX
    }

    public async createToDo(userId?: string, todo?: TodoItem) {
        if (userId) {
            if (todo) {
                logger.info("Ready to add a new todo")
                await this.todoDocument.put({
                    TableName: this.todoTable,
                    Item: todo
                }).promise();

                logger.info(`todo ${todo.name} is not added`)

                return todo
            } else {
                logger.error("No todo is added");
            }
        } else {
            logger.error("Unauthenticated operation")
        }
    }

    public async getToDos(userId?: string): Promise<TodoItem[]> {
        if (userId) {
            logger.info("Ready to get all todos")
            const todos = await this.todoDocument.query({
                TableName: this.todoTable,
                IndexName: this.todoCreatedAtIndex,
                KeyConditionExpression: "#userId = :userId",
                ExpressionAttributeNames: {
                    "#userId": "userId"
                },
                ExpressionAttributeValues: {
                    ":userId": userId
                }
            }).promise()

            return todos.Items as TodoItem[]
        } else {
            logger.error(`Unauthenticated operation`)
        }
    }

    public async updateToDo(userId?: string, todoId?: string, todo?: TodoUpdate) {
        if (userId) {
            if (todoId && todo) {
                logger.info(`Found todo ${todoId}, ready for update`)

                await this.todoDocument.update({
                    TableName: this.todoTable,
                    Key: {
                        todoId,
                        userId
                    },
                    UpdateExpression: "set #name = :name, #dueDate = :dueDate, #done = :done",
                    ExpressionAttributeNames: {
                        "#name": "name",
                        "#dueDate": "dueDate",
                        "#done": "done"
                    },
                    ExpressionAttributeValues: {
                        ":name": todo.name,
                        ":dueDate": todo.dueDate,
                        ":done": todo.done
                    }
                }).promise()
            }
            else {
                logger.error(`Todo ${todoId} not found`)
            }
        } else {
            logger.error(`Unauthenticated operation`)
        }
    }

    public async deleteTodo(userId?: string, todoId?: string) {
        if (userId) {
            if (todoId) {
                logger.info(`Ready to delete todo ${todoId}`)

                await this.todoDocument.delete({
                    TableName: this.todoTable,
                    Key: {
                        todoId,
                        userId
                    }
                }).promise()
            } else {
                logger.error(`Fail to delete todo ${todoId}`)
            }
        } else {
            logger.error("Unauthenticated operation")
        }
    }

    public async createAttachmentPresignedUrl(userId?: string, todoId?: string, attachmentId?: string): Promise<string> {
        const attachmentUrl = attachmentUtil.getAttachmentUrl(attachmentId);

        if (userId) {
            if (todoId) {
                await this.todoDocument.update({
                    TableName: this.todoTable,
                    Key: {
                        todoId, userId
                    },
                    UpdateExpression: "set #attachmentUrl = :attachmentUrl",
                    ExpressionAttributeNames: {
                        "#attachmentUrl": "attachmentUrl"
                    },
                    ExpressionAttributeValues: {
                        ":attachmentUrl": attachmentUrl
                    }
                }).promise()

                return attachmentUtil.generateUploadUrl(attachmentUrl)

            } else {
                logger.error("Fail to generate upload url")
            }
        } else {
            logger.error("Unauthenticated operation")
        }
    }
}