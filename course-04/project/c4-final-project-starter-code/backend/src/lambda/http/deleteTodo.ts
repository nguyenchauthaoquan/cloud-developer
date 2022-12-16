import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

import { getUserId } from '../utils'
import {DeleteTodoRequest} from "../../requests/DeleteTodoRequest";
import {deleteTodo} from "../../helpers/businessLogic/todo/todos";

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    const todoId: DeleteTodoRequest = {
        id: event.pathParameters.todoId
    }
    // TODO: Remove a TODO item by id
      const userId = getUserId(event)

    await deleteTodo(userId, todoId)
    return {
        statusCode: 200,
        body: JSON.stringify({})
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
