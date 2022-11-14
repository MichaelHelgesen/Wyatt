import S from "@sanity/desk-tool/structure-builder";
import { MdMenu } from 'react-icons/md'

export default () =>
  // New Studio content list
  S.list()
    // Title of the content list
    .title("Content")
    // The different items in the content list
    .items([
      // Single content list item
      S.listItem()
        // Title of the item
        .title("Menu")
        .icon(MdMenu)
        // The child of the item (what is revealed on click)
        .child(
          // Return a document editor
          S.document()
            // What kind of document
            .schemaType("menu")
            // ID of document
            .documentId("menu")
            .title("Menu")
        ),
      S.divider(),
      S.listItem()
        .title('Blogpost')
        .schemaType('post')
        .child(
            S.documentList()
            .title('Blogpost')
            .filter('_type == "post"')
    ),
    S.listItem()
        .title('Podcast')
        .schemaType('podcast')
        .child(
            S.documentList()
            .title('Podcast')
            .filter('_type == "podcast"')
    ),
    S.divider(),
    S.listItem()
        .title('Work')
        .schemaType('work')
        .child(
            S.documentList()
            .title('Work')
            .filter('_type == "work"')
    ),
    S.listItem()
        .title('Event')
        .schemaType('events')
        .child(
            S.documentList()
            .title('Event')
            .filter('_type == "event"')
    ),
    S.divider(),
    S.listItem()
        .title('Client')
        .schemaType('client')
        .child(
            S.documentList()
            .title('Client')
            .filter('_type == "client"')
    ),
    S.listItem()
        .title('Person')
        .schemaType('person')
        .child(
            S.documentList()
            .title('Person')
            .filter('_type == "person"')
    ),
    S.divider(),
      // Return rest of content list items, but filter out those already listed
      ...S.documentTypeListItems().filter(
        (listItem) => !["menu", "post", "podcast", "events", "work", "client", "person"].includes(listItem.getId())
      ),
    ]);
