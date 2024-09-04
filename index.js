import 'dotenv/config';
import path from 'path';
import { Porcupine, BuiltinKeyword, getInt16Frames } from '@picovoice/porcupine-node';
import { readWaveFile } from './utils/read-wave-file.js';

const config = {
    samplesPath: path.resolve("samples"),
    accessKey: process.env.PICOVOICE_ACCESS_KEY,
};

const porcupine = new Porcupine(
    config.accessKey,
    [BuiltinKeyword.JARVIS],
    [0.65],
);

async function main() {
    const inputWaveFile = await readWaveFile("./samples/Jarvis.wav");

    const frames = getInt16Frames(inputWaveFile, porcupine.frameLength);

    for (const frame of frames) {
        const matchIndex = porcupine.process(frame);

        if (matchIndex !== -1) {
            console.log("Detected keyword");
        }
    }
}

main();
