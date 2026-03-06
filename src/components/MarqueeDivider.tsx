const WORDS = [
    "AI/ML Engineer",
    "Full Stack Developer",
    "Deep Learning",
    "Computer Vision",
    "Natural Language Processing",
    "Data Science",
    "React",
    "Python",
    "TensorFlow",
    "Innovation",
];

export default function MarqueeDivider() {
    const repeated = [...WORDS, ...WORDS, ...WORDS, ...WORDS];
    return (
        <div className="marquee-container select-none">
            <div className="marquee-content">
                {repeated.map((word, i) => (
                    <span key={i} className={i % 3 === 0 ? "accent-word" : ""}>
                        {word} ✦
                    </span>
                ))}
            </div>
        </div>
    );
}
