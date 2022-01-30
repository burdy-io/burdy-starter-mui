import React from 'react';

import {
  AnnouncementBlock,
  ContentBlock,
  FeaturesBlock,
  ClipboardBlock,
  RichTextBlock,
  StepsBlock,
  ContactFormBlock,
} from '@components/blocks';

import { FeatureTable } from '@components/core';

const jsonSafeParse = (json: string, fallback?: any) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    return fallback;
  }
};

export const blocksMapper = ({ component_name, ...props }) => {
  switch (component_name) {
    case 'clipboard-section': {
      const { content, text, successMessage } = props;
      return (
        <ClipboardBlock text={text} successMessage={successMessage}>
          {content || ''}
        </ClipboardBlock>
      );
    }
    case 'content-section': {
      const {
        title,
        titleVariant,
        titleFontSize,
        caption,
        description,
        image,
        imagePosition,
        primaryAction,
        secondaryAction,
        backgroundImage,
        clipPath,
        backgroundColor,
        color,
        checkList,
      } = props;
      return (
        <ContentBlock
          title={title}
          titleVariant={titleVariant}
          titleFontSize={titleFontSize}
          caption={caption}
          description={description}
          image={image?.[0] || undefined}
          imagePosition={imagePosition}
          primaryAction={primaryAction}
          secondaryAction={secondaryAction}
          backgroundImage={backgroundImage}
          clipPath={clipPath}
          backgroundColor={backgroundColor}
          color={color}
          checkList={checkList}
        />
      );
    }
    case 'steps-section': {
      const { title, titleVariant, caption, steps } = props;
      return <StepsBlock title={title} titleVariant={titleVariant} caption={caption} steps={steps} />;
    }
    case 'feature-section': {
      const { title, titleVariant, caption, description, backgroundImage, clipPath, backgroundColor, color, features } =
        props;
      return (
        <FeaturesBlock
          title={title}
          titleVariant={titleVariant}
          caption={caption}
          description={description}
          features={features}
          backgroundImage={backgroundImage}
          clipPath={clipPath}
          backgroundColor={backgroundColor}
          color={color}
        />
      );
    }
    case 'announcement-section': {
      const { title, caption, appearance, primaryAction } = props;
      return (
        <AnnouncementBlock title={title} caption={caption} appearance={appearance} primaryAction={primaryAction} />
      );
    }
    case 'richtext': {
      const { content, maxWidth } = props;
      return <RichTextBlock content={content} maxWidth={maxWidth} />;
    }
    case 'contact-form': {
      const { title } = props;
      return <ContactFormBlock title={title} />;
    }
    case 'feature-table': {
      const { header, content, checkmarkText, minWidth } = props;
      return (
        <FeatureTable
          header={jsonSafeParse(header, [])}
          content={jsonSafeParse(content, [])}
          checkmarkText={checkmarkText}
          minWidth={Number.parseFloat(minWidth)}
        />
      );
    }
    default:
      return <>{component_name} - Component Not Found!</>;
  }
};

export const dynamicMapper = (zone: any[] = []) => zone.map(blocksMapper);
