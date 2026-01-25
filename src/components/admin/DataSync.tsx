import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FaDownload, FaCopy, FaCheck } from 'react-icons/fa';

const DataSync = () => {
    const data = useData();
    const [copied, setCopied] = useState<string | null>(null);

    const exportAllData = () => {
        const allData = {
            projects: data.projects,
            heroContent: data.heroContent,
            socialLinks: data.socialLinks,
            aboutStats: data.aboutStats,
            skills: data.skills,
            experience: data.experience,
            achievements: data.achievements,
        };
        
        return JSON.stringify(allData, null, 2);
    };

    const exportForConstants = () => {
        const constantsFormat = `// Updated constants with your data
export const NAV_LINKS = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
];

export const HERO_CONTENT = ${JSON.stringify(data.heroContent, null, 2)};

export const SKILLS = ${JSON.stringify(data.skills, null, 2)};

export const PROJECTS = ${JSON.stringify(data.projects, null, 2)};

export const EXPERIENCE = ${JSON.stringify(data.experience, null, 2)};

export const ACHIEVEMENTS = ${JSON.stringify(data.achievements, null, 2)};

export const SOCIAL_LINKS = ${JSON.stringify(data.socialLinks, null, 2)};
`;
        return constantsFormat;
    };

    const copyToClipboard = async (text: string, type: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(type);
            setTimeout(() => setCopied(null), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const downloadAsFile = (content: string, filename: string) => {
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="space-y-6">
            <div className="bg-primary p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Data Export</h3>
                <p className="text-gray-400 mb-4">
                    Export your data to update the deployed version of your portfolio.
                </p>
                
                <div className="space-y-4">
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-2">For Constants.ts File</h4>
                        <div className="flex gap-2">
                            <button
                                onClick={() => copyToClipboard(exportForConstants(), 'constants')}
                                className="flex items-center gap-2 px-4 py-2 bg-accent-purple text-white rounded-lg hover:bg-purple-600 transition-colors"
                            >
                                {copied === 'constants' ? <FaCheck /> : <FaCopy />}
                                {copied === 'constants' ? 'Copied!' : 'Copy Constants'}
                            </button>
                            <button
                                onClick={() => downloadAsFile(exportForConstants(), 'constants.ts')}
                                className="flex items-center gap-2 px-4 py-2 bg-accent-green text-white rounded-lg hover:bg-green-600 transition-colors"
                            >
                                <FaDownload />
                                Download
                            </button>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Raw JSON Data</h4>
                        <div className="flex gap-2">
                            <button
                                onClick={() => copyToClipboard(exportAllData(), 'json')}
                                className="flex items-center gap-2 px-4 py-2 bg-support-cyan text-white rounded-lg hover:bg-cyan-600 transition-colors"
                            >
                                {copied === 'json' ? <FaCheck /> : <FaCopy />}
                                {copied === 'json' ? 'Copied!' : 'Copy JSON'}
                            </button>
                            <button
                                onClick={() => downloadAsFile(exportAllData(), 'portfolio-data.json')}
                                className="flex items-center gap-2 px-4 py-2 bg-support-orange text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                <FaDownload />
                                Download JSON
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-primary p-6 rounded-lg border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Instructions</h3>
                <div className="text-gray-300 space-y-2">
                    <p><strong>To update your deployed site:</strong></p>
                    <ol className="list-decimal list-inside space-y-1 ml-4">
                        <li>Click "Copy Constants" above</li>
                        <li>Open your <code className="bg-gray-800 px-2 py-1 rounded">src/utils/constants.ts</code> file</li>
                        <li>Replace the entire file content with the copied data</li>
                        <li>Commit and push your changes</li>
                        <li>Redeploy your site</li>
                    </ol>
                </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <p className="text-yellow-400 text-sm">
                    <strong>Note:</strong> This exports your current localStorage data. Make sure you've added all your projects and content before exporting.
                </p>
            </div>
        </div>
    );
};

export default DataSync;