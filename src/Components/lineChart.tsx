"use client"

import React from "react"
import { TrendingUp } from "lucide-react"
import { TrendingDown } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { formatDate } from "@/utils/utils"
import { StockMetaData, StockValue } from "@/lib/types"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export const LineChart = ({ stockValues, stockMetaData }: { stockValues: StockValue[], stockMetaData: StockMetaData }) => {
    stockValues.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime());
    const oldestEntry = Number(stockValues[0].close)
    const latestEntry = Number(stockValues[stockValues.length - 1].close)
    const chartData = stockValues.map((value) => {
        return { date: formatDate(value.datetime), close: Number(value.close) }
    })
    const minValue = Math.min(...stockValues.map((value) => Math.floor(Number(value.low))));
    const maxValue = Math.max(...stockValues.map((value) => Math.floor(Number(value.high))));
    const yAxisPadding = ((maxValue - minValue) * 0.1);
    const chartConfig = {
        close: {
            label: "Close",
            color: "hsl(var(--chart-1))",
        }
    } satisfies ChartConfig
    return (
        <Card>
            <CardHeader>
                <CardTitle>{stockMetaData.symbol}</CardTitle>
                <CardDescription>
                    Changes for the last 15 trading hours
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(4, 10)}
                        />
                        <YAxis
                            domain={[minValue - yAxisPadding, maxValue + yAxisPadding]} // Custom y-axis range
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" hideLabel={false} />}
                        />
                        <Area
                            dataKey="close"
                            type="linear"
                            fill="var(--color-close)"
                            fillOpacity={0.4}
                            stroke="var(--color-close)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            {oldestEntry > latestEntry ? `Trending down by ${(latestEntry / oldestEntry).toFixed(2)}%` : `Trending up by ${(latestEntry / oldestEntry).toFixed(2)}%`}
                            {oldestEntry > latestEntry ? <TrendingDown /> : <TrendingUp />}
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}
