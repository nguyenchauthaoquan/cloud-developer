import { TodosAccess } from '../../dataLayer/todo/todosAcess'
import { CreateTodoRequest } from '../../../requests/CreateTodoRequest'
import { UpdateTodoRequest } from '../../../requests/UpdateTodoRequest'
import { createLogger } from '../../../utils/logger'
import * as uuid from 'uuid'
import {GetToDoResponse} from "../../../response/GetToDoResponse";
import {DeleteTodoRequest} from "../../../requests/DeleteTodoRequest";
import {CreateAttachmentPresignedUrl} from "../../../requests/CreateAttachmentPresignedUrl";

// TODO: Implement businessLogic
const logger = createLogger("Todo BL")
const todoAccessLayer = new TodosAccess()

export const createTodo = async (userId: string, request?: CreateTodoRequest) => {
    logger.info("BL: createTodo")

    if (request) {
        logger.info("Adding a new todo")

        return await todoAccessLayer.createToDo(userId, {
            userId: userId,
            todoId: uuid.v4(),
            createdAt: (new Date()).toISOString(),
            done: false,
            attachmentUrl: null,
            ...request
        })
    } else {
        logger.error("Add failure")
    }
}

export const getTodos = async (userId: string) : Promise<GetToDoResponse[]> => {
    logger.info("BL: getTodos")

    const result = await todoAccessLayer.getToDos(userId);

    return result as GetToDoResponse[]
}

export const updateTodo = async (userId: string, todoId?: string, request?: UpdateTodoRequest) => {
    await todoAccessLayer.updateToDo(userId, todoId, request);
}

export const deleteTodo = async (userId: string, request?: DeleteTodoRequest) => {
    await todoAccessLayer.deleteTodo(userId, request.id);
}

export const createAttachmentPresignedUrl = async (userId: string, request?: CreateAttachmentPresignedUrl): Promise<string> => {
    return await todoAccessLayer.createAttachmentPresignedUrl(userId, request.todoId, request.attachmentId)
}