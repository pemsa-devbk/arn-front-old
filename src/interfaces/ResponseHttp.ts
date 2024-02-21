export interface ResponseHttp<T> {
    status: boolean;
    data: T
}
export interface GeneralTask {
    idTask: string;
    name: string;
    cron: string;
    state: boolean;
    createAt: string;
    updateAt: string;
    typeAccount: number;
    sendMail: boolean;
    sendWhatsApp: boolean;
    sendTelegram: boolean;
    lastRun: null | string;
    accounts: Account[];
    ignoreEmpty: boolean;
    idFilter: number;
    contacts: Contact[];
}

export interface TaskStateSend {
    name: string;
    cron: string;
    typeAccount: number;
    ignoreEmpty: boolean;
    accounts: Account[];
    reportOpen: boolean;
    reportClose: boolean;
    bodyMessage: boolean;
    fileMessage: boolean;
}

export interface TaskState extends GeneralTask {
    reportOpen: boolean;
    reportClose: boolean;
    bodyMessage: boolean;
    fileMessage: boolean;
}
export interface TaskReportSend {
    name: string;
    cron: string;
    typeAccount: number;
    ignoreEmpty: boolean;
    accounts: Account[];
    format: string;
    isAccumulated: boolean;
    withPartition: boolean;
    comments: number;
    startQuery: string;
    isHorizontal: boolean;
    withNames: boolean;
    reportTask: boolean;
}
export interface TaskReport extends GeneralTask {
    format: string;
    isAccumulated: boolean;
    withPartition: boolean;
    comments: number;
    startQuery: string;
    isHorizontal: boolean;
    withNames: boolean;
    reportTask: boolean;
}

export interface TaskPssSend {
    name: string;
    cron: string;
    typeAccount: number;
    ignoreEmpty: boolean;
    accounts: Account[];
    timeBatery: number;
    typeTimeBatery: string;
    timeCa: number;
    typeTimeCa: string;
    timeLastTest: number;
    typeTimeLastTest: string;
    typePss: number;
    bodyMessage: boolean;
    fileMessage: boolean;
}
export interface TaskPSS extends GeneralTask {
    timeBatery: number;
    timeCa: number;
    timeLastTest: number;
    typeTimeBatery: string;
    typeTimeCa: string;
    typeTimeLastTest: string;
    typePss: number;
    bodyMessage: boolean;
    fileMessage: boolean;
}


export interface Account {
    idAccount: string;
    typeAccount: number;
}
export interface AccountMW {
    CodigoCte: string;
    CodigoAbonado: string;
    Nombre: string;
    Direccion: string;
    codigoReceptora: number;
}
export interface GroupMW {
    CodeMW: number;
    Name: string;
    Type: number;
}
export interface Contact {
    typeContact: number;
    contact: string
}

export interface Alarm {
    CodigoAlarma: string;
    DescripcionAlarm: string;
}

export interface Event {
    CodigoEvento: string;
    DescripcionEvent: string;
    CodigoAlarma: string;
}

export interface FilterSend {
    name: string;
    showZone: boolean;
    showUser: boolean;
    exclude: boolean;
    isSpecial: boolean;
    filterEvents: Array<FilterEvent>;
}

export interface Filter {
    idFilter: number;
    name: string;
    showZone: boolean;
    showUser: boolean;
    exclude: boolean;
    isSpecial: boolean;
}

export interface FilterWithEvents extends Filter {
    filterEvents: Array<FilterEvent>;
}
export interface FilterEvent {
    code: string;
    type: number;
}


