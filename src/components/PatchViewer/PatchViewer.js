import React, { Component } from 'react';
import './patchviewer.scss';

let getClass = (line) => {
  if (line.startsWith('+-')) {
    return "line_add";
  }

  if (line.startsWith('--')) {
    return "line_delete";
  }

  return "line";
}

let formatPatch = (raw) => {
  let lines = raw.split('\n');
  return (
    <table className="patch">
      <tbody>
      {lines.map(line => (
        <tr>
          <td className={getClass(line)} >{line}</td>
        </tr>
      ))}
      </tbody>
    </table>
    );
}

const PatchViewer = ({ rawPatch }) => (formatPatch(rawPatch));

export default PatchViewer;
