const fs = require('fs');
const readline = require('readline');

// File ke naam define kiye
const INPUT_FILE = 'server.log';
const OUTPUT_FILE = 'report.txt';

async function analyzeLogs() {
    console.log("Log file analyze kar raha hoon...");

    try {
        const fileStream = fs.createReadStream(INPUT_FILE);

        fileStream.on('error', (err) => {
            if (err.code === 'ENOENT') {
                console.error('Error: File nahi mili! Kripya server.log check karein.');
            } else {
                console.error('Error:', err.message);
            }
        });

        const lineReader = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });

        let errorCount = 0;
        let warningCount = 0;
        let infoCount = 0;
        let totalLines = 0;

        for await (const line of lineReader) {
            totalLines++;

            if (line.includes('[ERROR]')) {
                errorCount++;
            } else if (line.includes('[WARN]')) {
                warningCount++;
            } else if (line.includes('[INFO]')) {
                infoCount++;
            }
        }

        const reportContent = `
=== LOG ANALYSIS REPORT ===
Total Lines: ${totalLines}
--------------------------
Errors found:   ${errorCount}
Warnings found: ${warningCount}
Info logs:      ${infoCount}
--------------------------
Date: ${new Date().toLocaleString()}
`;

        console.log(reportContent);

        fs.writeFile(OUTPUT_FILE, reportContent, (err) => {
            if (err) {
                console.error('Report save karne mein dikkat aayi:', err);
            } else {
                console.log(`Report '${OUTPUT_FILE}' me save ho gayi hai.`);
            }
        });

    } catch (err) {
        console.error('Unexpected error:', err);
    }
}

analyzeLogs();
