import { DocumentRendererProps } from '@keystone-6/document-renderer';

export default interface HeroData {
  siteTitle: string;
  heroPreamble: DocumentRendererProps['document'];
  heroImages: string[];
}
