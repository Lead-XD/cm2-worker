
export interface AsanaTaskDocumentInterface {
  gid: string;
  resourceType: string;
  name: string;
  resourceSubtype: string;
  approvalStatus?: string;
  assigneeStatus?: string;
  completed: boolean;
  completedAt?: string;
  completedBy?: {
    gid: string;
    resourceType: string;
    name: string;
  };
  createdAt: string;
  dependencies?: Dependency[];
  dependents?: Dependent[];
  dueAt?: string;
  dueOn?: string;
  external?: {
    gid: string;
    data: string;
  };
  htmlNotes?: string;
  hearted?: boolean;
  hearts?: Heart[];
  isRenderedAsSeparator?: boolean;
  liked: boolean;
  likes?: Like[];
  memberships?: Membership[];
  modifiedAt?: string;
  notes?: string;
  numHearts?: number;
  numLikes?: number;
  numSubtasks?: number;
  startAt?: string;
  startOn?: string;
  actualTimeMinutes?: number;
  assignee?: {
    gid: string;
    resourceType: string;
    name: string;
  };
  assigneeSection?: {
    gid: string;
    resourceType: string;
    name: string;
  };
  customFields: CustomField[];
  followers?: Follower[];
  parent?: {
    gid: string;
    resourceType: string;
    name: string;
    resourceSubtype?: string;
  };
  projects: Project[];
  tags: Tag[];
  workspace: {
    gid: string;
    resourceType: string;
    name: string;
  };
  permalinkUrl: string;
  attachments: Attachment[];
}

interface Attachment {
    gid: string,
    createdAt: string,
    permanentURL: string,
    name: string,
    host: string,
}
interface Dependency {
  gid: string;
  resourceType: string;
}

interface Dependent {
  gid: string;
  resourceType: string;
}

interface Heart {
  gid: string;
  user: {
    gid: string;
    resourceType: string;
    name: string;
  };
}

interface Like {
  gid: string;
  user: {
    gid: string;
    resourceType: string;
    name: string;
  };
}

interface Membership {
  project: {
    gid: string;
    resourceType: string;
    name: string;
  };
  section: {
    gid: string;
    resourceType: string;
    name: string;
  };
}

interface CustomField {
  gid: string;
  name: string;
  type: string;
  enumOptions?: EnumOption[];
  enumValue?: EnumValue;
  displayValue?: string;
  description?: string;
}

interface EnumOption {
  gid: string;
  resourceType: string;
  name: string;
  enabled: boolean;
  color: string;
}

interface EnumValue {
  gid: string;
  name: string;
}

interface Follower {
  gid: string;
  resourceType: string;
  name: string;
}

interface Project {
  gid: string;
  resourceType: string;
  name: string;
}

interface Tag {
  gid: string;
  name: string;
}
