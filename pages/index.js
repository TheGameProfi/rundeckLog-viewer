import React, { useState } from 'react';

const IndexPage = () => {
    const [inputValue, setInputValue] = useState('');
    const [file, setFile] = useState(null);
    const [fileData, setFileData] = useState('');
    const [responseData, setResponseData] = useState(null);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleFileSelect = (event) => {
        setFile(event.target.files[0]);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        // Handle file upload here
        if (file) {
            var filename = file.name;
            if (filename.endsWith('.html') || filename.endsWith('.htm')) {
                const readFileData = (file) => {
                    const reader = new FileReader();

                    reader.onload = (e) => {
                        // e.target.result contains the file data
                        const fileData = e.target.result;
                        console.log(fileData);
                        // You can now use the fileData as needed
                        setFileData(fileData); // Update the fileData state
                    };

                    reader.readAsText(file); // You can also use readAsArrayBuffer or readAsDataURL depending on your needs
                };
                setFileData(readFileData(file));
            }
        }
    };

    const getLogs = async () => {
        //Check if the input is a URL
        let api;
        if (inputValue.startsWith('http') || inputValue.startsWith('https')) {
            console.log('Url' + inputValue)
            var lastDigit = inputValue.slice(-1);
            api = `/api/proxy?id=${lastDigit}`;
        } else {
            api = `/api/proxy?id=${inputValue}`;
        }
        try {
            const response = await fetch(api);
            console.log(response);
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            setResponseData(data.logHtmlArray);
        } catch (error) {
            console.error('Error fetching data:', error); // Log detailed error information
        }
        console.log('Response Data:', api);
    };

    return (
        <>
            <div className='log'>
                <div className='base'>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="input">Enter URL or ID:</label>
                        <input
                            type="text"
                            id="input"
                            name="input"
                            value={inputValue}
                            onChange={handleInputChange}
                        />
                        <button type="button" onClick={getLogs}>Get Logs</button>
                        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <label htmlFor="file">Upload HTML file:</label>
                        <input
                            type="file"
                            id="file"
                            name="file"
                            onChange={handleFileSelect}
                        />
                        <button type="submit">Submit</button>
                    </form>
                </div>
                <div className='rundeck' id="outputBox">
                    {responseData && responseData.map((logHtml, index) => (
                        <p className='ansicolor-on' style={{ whiteSpace: 'pre-wrap' }} key={index} dangerouslySetInnerHTML={{ __html: logHtml }} />
                    ))}
                    {fileData && <div className='ansicolor-on' dangerouslySetInnerHTML={{ __html: fileData }} />}
                </div>
            </div>
        </>
    );
};

export default IndexPage;