// components/SchemaRenderer.tsx
//import React from 'react';
import type { DynamicTabSchema } from './TabsList.types';
interface SchemaRendererProps {
  schema: DynamicTabSchema;
}

export function SchemaRenderer({ schema }: SchemaRendererProps) {
  // Enforce validation or parse different versions if required
  if (schema.version !== "1.0") {
    console.warn(`Unsupported schema layout version: ${schema.version}`);
  }

  // Render different layouts dynamically according to the component type set in the JSON blob
  switch (schema.componentType) {
    case 'form':
      return (
        <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '400px' }}>
          <h3>{schema.meta.title}</h3>
          {schema.meta.description && <p>{schema.meta.description}</p>}
          
          {schema.fields.map((field) => (
            <div key={field.name} style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ marginBottom: '4px', fontWeight: '500' }}>{field.label}</label>
              {field.type === 'select' ? (
                <select defaultValue={field.defaultValue}>
                  {field.options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              ) : (
                <input type={field.type === 'boolean' ? 'checkbox' : 'text'} defaultValue={field.defaultValue} />
              )}
            </div>
          ))}
          <button type="submit" style={{ marginTop: '10px', padding: '8px', background: '#007acc', color: '#fff', border: 'none' }}>Submit</button>
        </form>
      );

    case 'markdown':
      return (
        <article>
          <h3>{schema.meta.title}</h3>
          <p>{schema.meta.description || "Static text block loaded dynamically via JSON layout."}</p>
        </article>
      );

    default:
      // TypeScript compile-time warning guard for future proofing types
      return <div>Unknown view mode structure configured in JSON blob.</div>;
  }
}
