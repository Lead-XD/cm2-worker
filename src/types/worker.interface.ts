import { CommandContext, CommandExecutionData } from "./command.interface";

export type WorkFunction = (context: CommandContext, data: CommandExecutionData) => void;
