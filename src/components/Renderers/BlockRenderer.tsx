import type { ComponentType } from 'react'
import type { BlockComponentProps, PageBlock } from '../../types/content'

// Existing renderers
import HeroBlock from '../blocks/HeroBlock'
import RichTextBlock from '../blocks/RichTextBlock'
import CtaBlock from '../blocks/CtaBlock'
import FeatureGridBlock from '../blocks/FeatureGridBlock'
import ImageBlock from '../blocks/ImageBlock'

// P0 — text & basics
import ParagraphBlock from '../blocks/ParagraphBlock'
import HeadingBlock from '../blocks/HeadingBlock'
import ListBlock from '../blocks/ListBlock'
import QuoteBlock from '../blocks/QuoteBlock'
import CodeBlock from '../blocks/CodeBlock'
import SeparatorBlock from '../blocks/SeparatorBlock'
import SpacerBlock from '../blocks/SpacerBlock'

// P0 — media
import GalleryBlock from '../blocks/GalleryBlock'
import VideoBlock from '../blocks/VideoBlock'
import CoverBlock from '../blocks/CoverBlock'
import MediaTextBlock from '../blocks/MediaTextBlock'

// P0 — layout containers
import ColumnsBlock from '../blocks/ColumnsBlock'
import ColumnBlock from '../blocks/ColumnBlock'
import GroupBlock from '../blocks/GroupBlock'
import ButtonsBlock from '../blocks/ButtonsBlock'
import ButtonBlock from '../blocks/ButtonBlock'

// P1
import TableBlock from '../blocks/TableBlock'
import AccordionBlock from '../blocks/AccordionBlock'
import CalloutBlock from '../blocks/CalloutBlock'
import DetailsBlock from '../blocks/DetailsBlock'
import EmbedBlock from '../blocks/EmbedBlock'
import AudioBlock from '../blocks/AudioBlock'
import FileBlock from '../blocks/FileBlock'

// Marketing / custom
import CardBlock from '../blocks/CardBlock'
import IconBlock from '../blocks/IconBlock'
import TestimonialBlock from '../blocks/TestimonialBlock'
import LogoStripBlock from '../blocks/LogoStripBlock'
import FaqBlock from '../blocks/FaqBlock'

// Block type -> component. Editor block `type`s must match these keys.
const registry: Record<string, ComponentType<BlockComponentProps>> = {
  // marketing / composite
  hero: HeroBlock,
  cta: CtaBlock,
  featureGrid: FeatureGridBlock,
  richText: RichTextBlock,
  // text
  paragraph: ParagraphBlock,
  heading: HeadingBlock,
  list: ListBlock,
  quote: QuoteBlock,
  code: CodeBlock,
  separator: SeparatorBlock,
  spacer: SpacerBlock,
  // media
  image: ImageBlock,
  gallery: GalleryBlock,
  video: VideoBlock,
  cover: CoverBlock,
  mediaText: MediaTextBlock,
  // layout
  columns: ColumnsBlock,
  column: ColumnBlock,
  group: GroupBlock,
  buttons: ButtonsBlock,
  button: ButtonBlock,
  // P1
  table: TableBlock,
  accordion: AccordionBlock,
  callout: CalloutBlock,
  details: DetailsBlock,
  embed: EmbedBlock,
  audio: AudioBlock,
  file: FileBlock,
  // marketing / custom
  card: CardBlock,
  icon: IconBlock,
  testimonial: TestimonialBlock,
  logoStrip: LogoStripBlock,
  faq: FaqBlock,
}

export function BlockRenderer({ blocks }: { blocks: PageBlock[] }) {
  return (
    <>
      {blocks.map((block) => {
        const Component = registry[block.type]
        if (!Component) {
          if (import.meta.env.DEV) console.warn(`BlockRenderer: unknown block type "${block.type}"`)
          return null
        }
        return <Component key={block.blockId} block={block} />
      })}
    </>
  )
}
