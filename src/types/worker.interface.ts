import { CommandContext, CommandExecutionData } from "./command.interface";

const work = async (commandCTX: CommandContext, commandExecutionData: CommandExecutionData):Promise<void>=>{}

export type WorkFunction = typeof work;
