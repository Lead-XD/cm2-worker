import {
    EventFilterTypes,
    EventSources
} from "../constants/eventFilter.constants";

export interface EventFilterDocumentInterface {
    name:string,
    description: string,
    filter: { [key: string]: string },
    eventSource: EventSources,
    filterType:EventFilterTypes,
    match:string,
}
