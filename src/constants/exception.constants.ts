export enum CloudmateExceptionMetaDataTypes {
    project = "project",
    organization = "organization",
    asanaWebhook = "webhook",
    story = "story",
    task = "task",
    user = "user",
    message = "message",
    general = "general",
    unknown = "unknown",
    team = "team",
    workspace = "workspace",
    email = "email",
    event = "event",
    customField = "customField",
    command = "command",
    visma= "visma",
}

export enum CloudmateExceptionTypes {
    asana = "ASANA",
    google = "GOOGLE",
    cloudmate = "CLOUDMATE",
    unknown = "UNKNOWN",
    twilio = "TWILIO",
    sendGrid = "SENDGRID",
    microsoft = "MICROSOFT",
    visma = "VISMA",
    stripe = "STRIPE",
}

export const googleExceptionDescriptions = {
    email: {
        unableToFetchEmailAttachment: "Error occurred while fetching email attachment",
        unableToFetchEmail: "Error occurred while fetching email",
        unableToSendEmail: "Error occurred while sending email",
    },
    subscription: {
        unableToFetchHistory: "Error occurred while fetching history for google subscription",
        unableToCreateWatch: "Error occurred while creating watch for google subscription",
    }


}
export const cloudmateExceptionDescriptions = {
    microsoft: {
        subscription: {
            unableToCreateSubscription: "Unable to create subscription",
            unableToRenewSubscription: "Unable to renew subscription",
        }
    },
    user: {
        nameAlreadyExist: "Looks like this name already exist",
        noUserFound: "No User found against this ID",
    },
    cloudmate: {
        cloudmateOwnerDoesNotExist: "Cloudmate owner does not exist",
        cloudmateSetupErr: "Failed to Initialize Cloudmate",
        cloudmateDoesNotExist: "Cloudmate does not exist, Please setup cloudmate first",
        oneCloudmateInOrganization: "There can be only 1 cloudmate/bot in 1 organization",
        cloudmateAutoOauthFailed: "Cloudmate auto oauth failed",
    },
    message: {
        unableToParseMessageBody: "Unable to parse message body data",
        loveLetterMessageSubtaskMissing: "Unable to find or create love letter message subtask",
        asanaMessageEventFailed: "Asana message event failed",
        sms: {
            toPhoneNumberMissing: "To phone number is missing",
            toPhoneNumberInvalid: "To phone number is invalid",
            limitExceeded: "Limit exceeded for sending SMS",
            smsThreadSubtaskMissing: "Unable to find or create SMS thread subtask",
            scheduleSMSFailed: "Schedule SMS failed",
            smsFailed: "SMS failed",
        },
        email: {
            outgoingFailureNotification: "Received email failure notification from the provider.",
            receiverEmailMissing: "Receiver email missing",
            emailThreadSubtaskMissing: "Unable to find or create email thread subtask",
            limitExceeded: "Limit exceeded for sending Email",
            emailChannelSubtaskMissing: "Unable to find or create email channel subtask.",
            emailProviderNotFound: "Email provider not found",
            emailFailed: "Email failed",
            scheduleEmailFailed: "Schedule Email failed",
        },
        draft: {
            senderDoesNotExists: "Sender does not exists",
            subjectMissing: "Subject is missing",
            draftProcessingFailed: "Draft processing failed",
        }
    },
    project: {
        unableToFindProject: "Unable to find project",
        unableToFindOutboxProject: "Unable to find outbox project",
        unableToFindInboxProject: "Unable to find inbox project",
        unableToFindLoveLetterProject: "Unable to find love letter project",
        unableToFindOrCreateDraftProject: "Unable to find or create draft project",
        unableToFindOrCreateMessageTemplateProject: "Unable to find or create message template project",
    },
    draft: {
        "draftBodyMissing": "Draft body is missing",
        "draftSetupFailed": "Draft setup failed"
    },
    customField: {
        "requiredCustomFieldMissing": "Required custom field/s missing",
    },
    organization: {
        organizationDoesNotExists: "Organization does not exists.",
        noSelectedOrganization: "No Selected Organization for this user found",
    },
    webhook: {
        asanaWebhookProcessingFailed: "Asana webhook processing failed",
    },
    trpc: {
        trpcFunctionFailed: "TRPC function failed",
    },
    command: {
        unableToCreateCommand: "Unable to create command",
        commandError: {
            processRequireSubtaskCompletionCommand: "Error occurred while processing require-sub-task-completion command",
            pingCommand: "Error occurred while processing ping command",
        }
    },
    eventFilter: {
        unableToCreateEventFilter: "Unable to create event filter",
        unableToFindEventFilter: "Unable to find event filter",
    },
}


export enum AsanaExceptionDescriptions {
    failedToFetchTask = "Failed to fetch task",
    "incomingAttachmentUploadFailed" = "Incoming Attachment Upload Failed",
    asanaWebhookSignatureMismatch = "Asana webhook signature mismatch",
    failedToAddEnumOption = "Failed to add enum option",
    errorPostingStoryOnTask = "Exception occurred while posting story on task",
    sendMessageGetStory = "Sending SMS/Email from Asana: Exception occurred while fetching story by id to see whether it starts from love_letter or not and message can be fetched",
    sendSMSGetStory = "Sending SMS from Asana: Exception occurred while fetching story by id to see whether it starts from love_letter or not and message can be fetched",
    sendSMSGetMainTask = "Sending SMS from Asana: Exception occurred while fetching the main task on which story was created. Expected Task GID: ",
    likeStoryForIndication = "Sending SMS from Asana: Exception occurred while liking/updating story for an indication that process has started since contact number is also found.",
    contactNumberNotFound = "Sending SMS from ASANA: No contact number was found during the process.",
    emailNotFound = "Sending Email from ASANA: No email was found during the process.",
    scheduleSMSGetNewTask = "Scheduling SMS from Asana: Exception occurred while fetching the newly created task from user to schedule a SMS.",
    scheduleSMSCompleteTask = "Scheduling SMS from Asana: Exception occurred while completing the task as the message has been sent",
    scheduleEmailCompleteTask = "Scheduling Email from Asana: Exception occurred while completing the task as the email has been sent",
    gettingCompleteSmsThreadSubtask = "Receiving SMS in Asana: Exception occurred while getting complete SMS/Phone number Thread subtask so it's url can be embedded in story under phone number",
    creatingStoryToShowErrorWhileSendingSMS = "Sending SMS from Asana: Exception occurred while creating story to show error to user",
    addingUserInWorkspaceWhileInvitingUser = "Adding User in Workspace: Exception occurred while adding user in workspace on cloudmate invitation",
    addingUserInTeamWhileInvitingUser = "Adding User in Team: Exception occurred while adding cloudmate in Resources Team on cloudmate invitation",
    taskCreationWhileInvitingCloudmate = "Cloudmate Invitation: Exception occurred while creating task",
    subTaskCreationUnderSMSSubtask = "Sending SMS/Email from Asana: Exception occurred while creating message subtask under sms/email subtask",
    creatingPreferredChannelCustomField = "Exception occurred in creating preferred channel custom field in sms setup",
    createNewCustomField = "Exception occurred while creating new custom field",
    addingUsersInProject = "Exception occurred while adding users in project",
    gettingCustomFieldFailed = "Exception occurred while fetching custom field by GID",
    likeStoryForIndicationInSendingEmail = "Sending Email from Asana: Exception occurred while liking/updating story for an indication that process has started since email is also found.",
    gettingCompletedTaskInDrip = "Exception occurred while fetching task in process Asana Event for drip",
    gettingMessageTemplateProjectInDrip = "Exception occurred while fetching message template project from CM DB in process Asana Event for drip",
    gettingAllTasksInMessageTemplateProjectWithCustomFields = "Exception occurred while getting all tasks in message template project with Custom Fields",
    optInRequiredTrueSMSOptInFalse = "Opt-In Required true/Yes but SMS Opt In is false/No",
    optInRequiredTrueEmailOptInFalse = "Opt-In Required true/Yes but Email Opt In is false/No",
    gettingAllProjectsInAsana = "Exception occurred while fetching all projects in Asana, with fetchAll function (pagination adjusted)",
    failedToGetProject = "Exception occurred while fetching project in Asana.",
    getSubtaskInAsana = "Exception occurred while fetching subtask in Asana",
    updatingCustomFieldAndStoringInCM = "Exception occurred while updating custom field in Asana and storing in CM DB",
    creatingCustomFieldfindOrCreateCustomFieldInAsana = "Exception occurred in findOrCreateCustomFieldInAsana",
    addingCloudmateInProjectInInvitation = "Exception occurred while adding cloudmate in project during invitation",
    noPreferredChannelFound = "Exception occurred as no Preferred Channel was found/selected",
    findOrCreateSubTaskByName = "Exception occurred in function findOrCreateSubTaskByName. SubTask Name is: ",
    findSubTaskOrCreateTaskInAnotherProject = "Exception occurred in function findSubTaskOrCreateTaskInAnotherProject. SubTask Name is: ",
    postingSuccessStoryInMainThreadAndSource = "Exception occurred while posting success story in main thread, source or only one",
    creatingReplyEmailStoryInTask = "Exception occurred while posting story as an email reply in source task",
    completingSubtaskOfRepliedEmail = "Exception occurred while completed subtask (message object) of replied email",
    draftSetupSuccessStory = "Exception occurred while posting success story of draft setup",
    addingCustomFieldInProject = "Exception occurred while adding custom field in project",
    draftTask = "Exception occurred while fetching task from drafts project",
    gettingDraftProject = "Exception occurred while fetching draft project from CM DB in process Asana Event for draft",
    gettingAllWorkspacesInAsana = "Exception occurred while fetching all workspaces in Asana, with fetchAll function (pagination adjusted)",
    failedToDeleteAsanaWebhook = "Exception occurred while deleting Asana webhook",
    gettingTeamFailed = "Exception occurred while fetching team by GID",
    failedToArchiveProject = "Exception occurred while archiving project",
    failedToCreateProject = "Exception occurred while creating project",
    failedToUpdateWebhook = "Exception occurred while updating webhook",
    failedToGetCustomFieldSettingForProject = "Exception occurred while fetching custom field setting for project",
    failedToGetMembershipOfWorkspace = "Exception occurred while fetching membership of workspace",
    failedToUpdatedTasksBatch = "Exception occurred while updating tasks in batch",
    failedToUpdateTask = "Exception occurred while updating task",
    failedToAddTaskToProject = "Exception occurred while adding task to project",
    failedToRemoveTaskFromProject = "Exception occurred while removing task from project",
}

export enum TwilioExceptionDescriptions {
    twilioExceptionOccurred = "Sending SMS from Asana: Twilio Exception occurred while sending sms",
    twilioExceptionOccurredWhileScheduling = "Scheduling SMS from Asana: Twilio Exception occurred while sending a scheduled sms",
    createIncomingPhoneNumber = "Exception occurred while creating incoming phone number in Twilio",
    twilioSMSFailedAfterQueuing = "Twilio failed to send SMS after accepting in Queue"
}

export enum SendGridExceptions {
    sendGridExceptionOccurred = "Sending Email from Asana: SendGrid Exception occurred while sending email"
}
