import {
    EventFilterTypes,
    EventSources
} from "../constants/eventFilter.constants";

export type EventFilterDocumentType =  {
    name:string,
    description: string,
    filter: { [key: string]: string },
    eventSource: EventSources,
    filterType:EventFilterTypes,
    match:string,
}
