document.getElementById("run-btn").addEventListener("click", async function() {
    var code = editor.getValue();
    var stdin = document.getElementById("stdin").value;

    const url = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true&fields=*';
    const options = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': '3f17aeb5e6msh1001fef6c5c1f03p1ba141jsnd0b825d032da',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            language_id: 70,  // Python 2.7 ID
            source_code: btoa(code),  // Base64 encode the code
            stdin: btoa(stdin)  // Base64 encode the input
        })
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log('Submitted:', data);

        const resultUrl = `https://judge0-ce.p.rapidapi.com/submissions/${data.token}?base64_encoded=true&fields=*`;
        const resultResponse = await fetch(resultUrl, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '3f17aeb5e6msh1001fef6c5c1f03p1ba141jsnd0b825d032da',
                'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
            }
        });

        const resultData = await resultResponse.json();
        console.log('Result response:', resultData);

        let output = "";
        if (resultData.stdout) {
            output = atob(resultData.stdout);  // Decode base64 output
        } else if (resultData.stderr) {
            output = atob(resultData.stderr);  // Decode base64 error
        } else if (resultData.compile_output) {
            output = atob(resultData.compile_output);  // Decode base64 compile error
        } else {
            output = "No output or error.";
        }

        document.getElementById("output").textContent = output;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("output").textContent = `Error: ${error.message}`;
    }
});

// Initialize Ace editor
var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/python");
