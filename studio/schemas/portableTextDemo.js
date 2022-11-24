import React from "react";
import { MdSouthWest, MdNorthEast } from 'react-icons/md'

const highlightRender = (props) => (
  <span style={{ backgroundColor: "yellow" }}>{props.children}</span>
);

const internalLink = (props) => (
  <span style={{ textDecoration:"underline" }}>{props.children} <MdSouthWest /></span>
);

const externalLink = (props) => (
  <span style={{ textDecoration:"underline" }}>{props.children} <MdNorthEast /></span>
);

export default {
  title: "Portable TExt Demo",
  name: "portableTextDemo",
  type: "object",
  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 200,
        slugify: (input) =>
          input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
      },
    },
    {
      description:
        "The main text of the podcast post. Keep paragraphs short, and put the most important content first.",
      title: "Main text",
      name: "content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "H5", value: "h5" },
            { title: "H6", value: "h6" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            annotations: [
              {
                type: "internalRegularLink",
                blockEditor: {
                  icon: MdSouthWest,
                  render: internalLink,
                },
              },
              {
                type: "externalRegularLink",
                blockEditor: {
                  icon: MdNorthEast,
                  render: externalLink,
                },
              },
            ],
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
              { title: "Code", value: "code" },
              { title: "Underline", value: "underline" },
              { title: "Strike", value: "strike-through" },
              {
                title: "Highlight",
                value: "highlight",
                blockEditor: {
                  icon: () => "H",
                  render: highlightRender,
                },
              },
            ],
          },
        },
        {
          type: "blogImage",
        },
        {
          type: "youtubeLink",
        },
        {
          type: "blogInternalLink",
        },
        {
          type: "podcastInternalLink",
        },
      ],
    },
  ],
};
