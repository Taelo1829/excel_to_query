import './App.css';
import React, { useState, useEffect, useCallback } from 'react';

const styles = {
    container: {
        backgroundColor: '#111827',
        color: '#f3f4f6',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'sans-serif',
        padding: '1rem',
    },
    innerContainer: {
        width: '100%',
        maxWidth: '56rem',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    header: {
        textAlign: 'center',
        marginBottom: '2rem',
    },
    h1: {
        fontSize: '2.25rem',
        lineHeight: '2.5rem',
        fontWeight: '700',
        color: '#ffffff',
    },
    p: {
        fontSize: '1.125rem',
        lineHeight: '1.75rem',
        color: '#9ca3af',
        marginTop: '0.5rem',
    },
    main: {
        backgroundColor: '#1f2937',
        borderRadius: '0.75rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        padding: '2rem',
    },
    section: {
        marginBottom: '2rem',
    },
    label: {
        display: 'block',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        fontWeight: '500',
        color: '#d1d5db',
    },
    queryTextarea: {
        width: '100%',
        height: '8rem',
        padding: '1rem',
        fontFamily: 'monospace',
        fontSize: '0.875rem',
        backgroundColor: '#111827',
        color: '#fde047',
        border: '1px solid #374151',
        borderRadius: '0.375rem',
        resize: 'vertical',
        marginTop: '0.5rem',
    },
    button: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0.5rem 1rem',
        border: '1px solid transparent',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        fontWeight: '500',
        borderRadius: '0.375rem',
        boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        color: '#ffffff',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    updateButton: {
        backgroundColor: '#16a34a',
        marginTop: '0.75rem',
        width: '100%',
    },
    updateButtonHover: {
        backgroundColor: '#15803d',
    },
    uploadArea: {
        position: 'relative',
        display: 'block',
        width: '100%',
        borderRadius: '0.5rem',
        border: '2px dashed #4b5563',
        padding: '3rem',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'border-color 0.2s',
    },
    uploadAreaHover: {
        borderColor: '#6b7280',
    },
    uploadAreaDragging: {
        borderColor: '#6366f1',
    },
    uploadText: {
        marginTop: '0.5rem',
        display: 'block',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        fontWeight: '600',
        color: '#e5e7eb',
    },
    uploadHint: {
        fontSize: '0.75rem',
        lineHeight: '1rem',
        color: '#9ca3af',
    },
    srOnly: {
        position: 'absolute',
        width: '1px',
        height: '1px',
        padding: '0',
        margin: '-1px',
        overflow: 'hidden',
        clip: 'rect(0, 0, 0, 0)',
        whiteSpace: 'nowrap',
        borderWidth: '0',
    },
    errorText: {
        color: '#f87171',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        marginTop: '1rem',
        textAlign: 'center',
        fontWeight: '600',
    },
    resultsContainer: {
        backgroundColor: '#111827',
        padding: '1.5rem',
        borderRadius: '0.5rem',
        boxShadow: 'inset 0 2px 4px 0 rgba(0,0,0,0.06)',
    },
    resultsHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    resultsTitle: {
        fontSize: '1.25rem',
        lineHeight: '1.75rem',
        fontWeight: '600',
        color: '#ffffff',
    },
    resultsTextarea: {
        width: '100%',
        height: '24rem',
        padding: '1rem',
        fontFamily: 'monospace',
        fontSize: '0.875rem',
        backgroundColor: '#111827',
        color: '#86efac',
        border: '1px solid #374151',
        borderRadius: '0.375rem',
        resize: 'vertical',
    },
    copyButton: { backgroundColor: '#4f46e5' },
    copyButtonHover: { backgroundColor: '#4338ca' },
    clearButton: {
        backgroundColor: '#374151',
        border: '1px solid #4b5563',
        color: '#d1d5db',
        marginLeft: '0.5rem',
    },
    clearButtonHover: { backgroundColor: '#4b5563' },
    disabledButton: {
        backgroundColor: '#4b5563',
        cursor: 'not-allowed',
    },
};

// --- Helper Components ---

const UploadIcon = () => (
    <svg style={{ width: '3rem', height: '3rem', margin: 'auto', color: '#9ca3af' }} stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const Icon = ({ path, rect }) => (
    <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {rect && <rect x={rect.x} y={rect.y} width={rect.width} height={rect.height} rx="2" ry="2"></rect>}
        {path}
    </svg>
);

const CopyIcon = () => <Icon rect={{x:9, y:9, width:13, height:13}} path={<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>} />;
const ClearIcon = () => <Icon path={<><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z"></path><line x1="18" y1="9" x2="12" y2="15"></line><line x1="12" y1="9" x2="18" y2="15"></line></>} />;
const UpdateIcon = () => <Icon path={<><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.73-2.73L3 14"></path><path d="M3 21v-6h6"></path><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.73 2.73L21 10"></path><path d="M21 3v6h-6"></path></>} />;

// --- Main App Component ---

export default function App() {
    // --- State Management ---
    const defaultQuery = `UPDATE Shifts\nSET TimeComponents = REPLACE(TimeComponents, '&A&', '&E&')\nWHERE TimeComponents LIKE '%&A&%';`;
    const [customQuery, setCustomQuery] = useState(defaultQuery);
    const [sqlQueries, setSqlQueries] = useState('');
    const [fileName, setFileName] = useState('');
    const [error, setError] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [excelData, setExcelData] = useState(null);

    // Hover states for inline style transitions
    const [isUpdateHovered, setUpdateHovered] = useState(false);
    const [isUploadHovered, setUploadHovered] = useState(false);
    const [isCopyHovered, setCopyHovered] = useState(false);
    const [isClearHovered, setClearHovered] = useState(false);

    // --- Effects ---
    useEffect(() => {
        if (window.XLSX) {
            setIsScriptLoaded(true);
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdn.sheetjs.com/xlsx-0.20.2/package/dist/xlsx.full.min.js';
        script.onload = () => setIsScriptLoaded(true);
        script.onerror = () => setError('Failed to load the Excel processing library. Please refresh the page.');
        document.head.appendChild(script);

        return () => {
            if (script.parentNode) {
                document.head.removeChild(script);
            }
        };
    }, []);
    
    // --- Query Generation Logic ---
    const generateQueries = useCallback((data, queryTemplate) => {
        if (!data) {
            setError("No Excel data available to generate script.");
            return;
        }
        
        setIsProcessing(true);
        setError('');

        try {
            const queries = data.map((row) => {
                let queryForRow = queryTemplate;
                const placeholders = queryTemplate.match(/&[A-Z]&/g);

                if (!placeholders) return queryTemplate;

                let hasValues = false;
                placeholders.forEach(placeholder => {
                    const columnLetter = placeholder.substring(1, 2);
                    const columnIndex = columnLetter.charCodeAt(0) - 'A'.charCodeAt(0);
                    const cellValue = row[columnIndex];
                    
                    if (cellValue !== undefined && cellValue !== null) {
                        hasValues = true;
                        const sanitizedValue = String(cellValue).replace(/'/g, "''");
                        queryForRow = queryForRow.replace(new RegExp(placeholder, 'g'), sanitizedValue);
                    } else {
                        queryForRow = queryForRow.replace(new RegExp(placeholder, 'g'), '');
                    }
                });
                
                return hasValues ? queryForRow : null;
            }).filter(Boolean).join('\n\n');

            if (!queries) {
                 setError('No data found in the specified columns to generate queries.');
                 setSqlQueries('');
            } else {
                setSqlQueries(queries);
            }
        } catch(err) {
             console.error("Error generating queries:", err);
             setError('An error occurred while generating the SQL script.');
        } finally {
            setIsProcessing(false);
        }
    }, []);

    // --- File Processing Logic ---
    const processFile = useCallback((file) => {
        if (!file) {
            setError('No file selected.');
            return;
        }
        if (!file.type.match(/spreadsheetml/)) {
            setError('Invalid file type. Please upload an Excel file (.xlsx, .xls).');
            resetState(false);
            return;
        }
        setIsProcessing(true);
        setError('');
        setSqlQueries('');
        setFileName(file.name);

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = e.target.result;
                const workbook = window.XLSX.read(data, { type: 'binary' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const rows = window.XLSX.utils.sheet_to_json(worksheet, { header: 1, range: 1 });

                if (rows.length === 0) {
                    setError('The selected Excel sheet is empty or has no data after the first row.');
                    setExcelData(null);
                    setIsProcessing(false);
                    return;
                }
                
                setExcelData(rows);
                generateQueries(rows, customQuery);
            } catch (err) {
                console.error("Error processing file:", err);
                setError('An error occurred while processing the file. Please ensure it is a valid Excel file.');
                setExcelData(null);
                setIsProcessing(false);
            }
        };
        reader.onerror = () => {
             setError('Failed to read the file.');
             setIsProcessing(false);
        };
        reader.readAsBinaryString(file);
    }, [customQuery, generateQueries]);

    // --- Event Handlers ---
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        processFile(file);
        event.target.value = null;
    };
    const handleUpdateScript = () => generateQueries(excelData, customQuery);
    const handleCopyToClipboard = () => {
        if (!sqlQueries) return;
        const textArea = document.createElement('textarea');
        textArea.value = sqlQueries;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            setError('Failed to copy to clipboard.');
        }
        document.body.removeChild(textArea);
    };
    const resetState = (fullReset = true) => {
        setSqlQueries('');
        setFileName('');
        setError('');
        setIsProcessing(false);
        setExcelData(null);
        if (fullReset) setCustomQuery(defaultQuery);
    };
    const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
    const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        processFile(file);
    };

    // --- Dynamic Style Logic ---
    const getButtonStyle = (baseStyle, hoverStyle, isHovered, isDisabled) => {
        let style = { ...styles.button, ...baseStyle };
        if (isHovered) style = { ...style, ...hoverStyle };
        if (isDisabled) style = { ...style, ...styles.disabledButton };
        return style;
    };

    const uploadAreaStyle = {
        ...styles.uploadArea,
        ...(isUploadHovered && styles.uploadAreaHover),
        ...(isDragging && styles.uploadAreaDragging),
    };
    
    const updateBtnDisabled = !excelData || isProcessing;
    const updateButtonStyle = getButtonStyle(styles.updateButton, styles.updateButtonHover, isUpdateHovered, updateBtnDisabled);
    
    const copyBtnDisabled = !sqlQueries;
    const copyButtonStyle = getButtonStyle(styles.copyButton, styles.copyButtonHover, isCopyHovered, copyBtnDisabled);

    const clearButtonStyle = getButtonStyle(styles.clearButton, styles.clearButtonHover, isClearHovered, false);


    // --- Render Method ---
    return (
        <div style={styles.container}>
            <div style={styles.innerContainer}>
                <header style={styles.header}>
                    <h1 style={styles.h1}>Excel to SQL Query Generator</h1>
                    <p style={styles.p}>Define a query template, upload an Excel file, and generate your SQL script.</p>
                </header>

                <main style={styles.main}>
                    <div style={styles.section}>
                        <label htmlFor="custom-query" style={styles.label}>
                           SQL Query Template (use &A&, &B&, etc.)
                        </label>
                        <textarea
                            id="custom-query"
                            value={customQuery}
                            onChange={(e) => setCustomQuery(e.target.value)}
                            style={styles.queryTextarea}
                            placeholder="e.g., UPDATE my_table SET value = '&B&' WHERE id = '&A&';"
                        />
                         <button
                            onClick={handleUpdateScript}
                            disabled={updateBtnDisabled}
                            style={updateButtonStyle}
                            onMouseEnter={() => setUpdateHovered(true)}
                            onMouseLeave={() => setUpdateHovered(false)}
                        >
                            <UpdateIcon />
                            Update Script
                        </button>
                    </div>

                    <div style={{...styles.section, marginBottom: 0}}>
                        <label
                            htmlFor="file-upload"
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onMouseEnter={() => setUploadHovered(true)}
                            onMouseLeave={() => setUploadHovered(false)}
                            style={uploadAreaStyle}
                        >
                            <UploadIcon />
                            <span style={styles.uploadText}>
                                {fileName || 'Drag & drop a file or click to upload'}
                            </span>
                            <p style={styles.uploadHint}>.xlsx or .xls files only</p>
                            <input id="file-upload" name="file-upload" type="file" style={styles.srOnly} onChange={handleFileChange} accept=".xlsx, .xls" disabled={isProcessing || !isScriptLoaded} />
                        </label>
                        {!isScriptLoaded && <p style={{...styles.errorText, color: '#fde047'}}>Loading Excel library...</p>}
                        {error && <p style={styles.errorText}>{error}</p>}
                    </div>

                    {(sqlQueries || isProcessing) && (
                        <div style={{...styles.section, marginTop: '2rem', marginBottom: 0}}>
                            <div style={styles.resultsContainer}>
                                <div style={styles.resultsHeader}>
                                    <h2 style={styles.resultsTitle}>Generated SQL Script</h2>
                                    <div style={{ display: 'flex' }}>
                                        <button 
                                            onClick={handleCopyToClipboard} 
                                            disabled={copyBtnDisabled} 
                                            style={copyButtonStyle}
                                            onMouseEnter={() => setCopyHovered(true)}
                                            onMouseLeave={() => setCopyHovered(false)}
                                        >
                                            <CopyIcon />
                                            {isCopied ? 'Copied!' : 'Copy SQL'}
                                        </button>
                                         <button 
                                            onClick={() => resetState(true)} 
                                            style={clearButtonStyle}
                                            onMouseEnter={() => setClearHovered(true)}
                                            onMouseLeave={() => setClearHovered(false)}
                                        >
                                            <ClearIcon />
                                            Clear All
                                        </button>
                                    </div>
                                </div>
                                <textarea
                                    readOnly
                                    value={isProcessing ? 'Generating queries...' : sqlQueries}
                                    style={styles.resultsTextarea}
                                    placeholder="SQL queries will appear here..."
                                />
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
