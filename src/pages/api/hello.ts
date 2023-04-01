// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {name} from "next/dist/telemetry/ci-info";

type Data = {
  name: string
}
// @ts-ignore
function cloudVision (fileName){
  // Imports the Google Cloud client libraries
  const vision = require('@google-cloud/vision');
  const fs = require('fs');

// Creates a client
  const client = new vision.ImageAnnotatorClient();

  /**
   * TODO(developer): Uncomment the following line before running the sample.
   */
  //const fileName = `/path/to/localImage.png`;
  const request = {
    image: {content: fs.readFileSync(fileName)},
  };

// @ts-ignore
  const [result] = await client.objectLocalization(request);
  const objects = result.localizedObjectAnnotations;
// @ts-ignore
  objects.forEach(object => {
    console.log(`Name: ${object.name}`);
    console.log(`Confidence: ${object.score}`);
    const vertices = object.boundingPoly.normalizedVertices;
    // @ts-ignore
    vertices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
  });
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,


) {
  res.status(200).json({ name: 'John Doe' })
}
