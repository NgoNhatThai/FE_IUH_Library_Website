import { ImageModel } from './imageModel';

export interface ProductTagModel {
  id?: string;
  organizationId?: string;
  name?: string;
  description?: string;
  promotional?: boolean;
  customerPreference?: boolean;
  seasonal?: boolean;
  filter?: boolean;
  imageUrl?: string;
  createdDate?: string;
  avatarMetadata?: ImageModel[];
}
