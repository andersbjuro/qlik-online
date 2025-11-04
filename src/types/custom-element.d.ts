
import React from 'react';

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'qlik-embed': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        ui: string;
        "app-id": string
        "sheet-id"?: string;
        "object-id"?: string;
        language?: string;
        iframe?: string;
      };
    }
  }
}
