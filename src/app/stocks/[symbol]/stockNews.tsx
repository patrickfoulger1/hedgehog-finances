import { StockNewsData } from '@/lib/types'
import { formatUnixDate } from '@/utils/formatUnixDate'
import Link from 'next/link'
import {
    Card,
    CardHeader,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from "@/components/ui/card"
export default function StockNews({ post }: { post: StockNewsData }) {
    return (
        <Link href={post.url} target='_blank'>
            <Card className='flex w-full items-start gap-2 text-sm'>
                <CardHeader>
                    <CardTitle>{post.headline}</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription>{post.summary}</CardDescription>
                </CardContent>
                <CardFooter>
                    <div className="flex w-full items-start gap-2 text-sm">
                        <div className="grid gap-2">
                            {post.source}
                            <div className="flex items-center gap-2 font-medium leading-none">{formatUnixDate(post.datetime)}</div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </Link>
    )
}