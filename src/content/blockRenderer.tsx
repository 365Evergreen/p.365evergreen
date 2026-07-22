import type { ComponentType } from 'react'
import type { BlockComponentProps, PageBlock } from '../types/content'

// Existing renderers
import HeroBlock from '../components/blocks/HeroBlock'
import RichTextBlock from '../components/blocks/RichTextBlock'
import CtaBlock from '../components/blocks/CtaBlock'
import FeatureGridBlock from '../components/blocks/FeatureGridBlock'
import ImageBlock from '../components/blocks/ImageBlock'

// P0 — text & basics
import ParagraphBlock from '../components/blocks/ParagraphBlock'
import HeadingBlock from '../components/blocks/HeadingBlock'
import ListBlock from '../components/blocks/ListBlock'
import QuoteBlock from '../components/blocks/QuoteBlock'
import CodeBlock from '../components/blocks/CodeBlock'
import SeparatorBlock from '../components/blocks/SeparatorBlock'
import SpacerBlock from '../components/blocks/SpacerBlock'

// P0 — media
import GalleryBlock from '../components/blocks/GalleryBlock'
import VideoBlock from '../components/blocks/VideoBlock'
import CoverBlock from '../components/blocks/CoverBlock'
import MediaTextBlock from '../components/blocks/MediaTextBlock'

// P0 — layout containers
import ColumnsBlock from '../components/blocks/ColumnsBlock'
import ColumnBlock from '../components/blocks/ColumnBlock'
import GroupBlock from '../components/blocks/GroupBlock'
import ButtonsBlock from '../components/blocks/ButtonsBlock'
import ButtonBlock from '../components/blocks/ButtonBlock'

// P1
import TableBlock from '../components/blocks/TableBlock'
import AccordionBlock from '../components/blocks/AccordionBlock'
import CalloutBlock from '../components/blocks/CalloutBlock'
import DetailsBlock from '../components/blocks/DetailsBlock'
import EmbedBlock from '../components/blocks/EmbedBlock'
import AudioBlock from '../components/blocks/AudioBlock'
import FileBlock from '../components/blocks/FileBlock'

// Marketing / custom
import CardBlock from '../components/blocks/CardBlock'
import IconBlock from '../components/blocks/IconBlock'
import TestimonialBlock from '../components/blocks/TestimonialBlock'
import LogoStripBlock from '../components/blocks/LogoStripBlock'
import FaqBlock from '../components/blocks/FaqBlock'

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

