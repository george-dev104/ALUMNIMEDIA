import Heading from "@/atoms/Heading"

interface FrequentlyAskedQuestionProps {
    question: string
    answer: string | React.ReactNode
}

export default function FrequentlyAskedQuestion({ question, answer }: FrequentlyAskedQuestionProps) {
    return (
        <div className="bg-secondary px-8 py-4 rounded">
            <Heading text={question} className="uppercase text-2xl font-bold text-white mb-3" />
            {typeof answer === 'string' ? <p className="text-white">{answer}</p> : answer}
        </div>
    )
}