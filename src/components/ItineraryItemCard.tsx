import { motion, AnimatePresence } from 'framer-motion';
import { ItineraryItem, Train } from '../data/types';
import { Fragment, useRef, useEffect, useState, useMemo } from 'react';

// Define constants
const TIMELINE_LINE_WIDTH_PX = 2; // Width corresponding to w-0.5 in pixels

// Centralized type-specific configurations
const typeConfig = {
    '景點': {
        background: 'bg-white',
        iconClass: 'bg-pink-100 text-pink-600',
        icon: (
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2c-3.31 0-6 2.69-6 6 0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6zm0 9a3 3 0 100-6 3 3 0 000 6z"></path>
            </svg>
        ),
    },
    '交通': {
        background: 'bg-purple-50',
        iconClass: 'bg-purple-100 text-purple-500',
        icon: (
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
            </svg>
        ),
    },
    '餐廳': {
        background: 'bg-rose-50',
        iconClass: 'bg-rose-100 text-rose-600',
        icon: (
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
            </svg>
        ),
    },
    '其他': {
        background: 'bg-gray-50',
        iconClass: 'bg-gray-100 text-gray-600',
        icon: (
            <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
        ),
    },
};

interface ItineraryItemCardProps {
    item: ItineraryItem;
    index: number;
    isExpanded: boolean;
    toggleExpand: () => void;
}

const ItineraryItemCard: React.FC<ItineraryItemCardProps> = ({
    item,
    index,
    isExpanded,
    toggleExpand,
}) => {
    const config = typeConfig[item.type] || typeConfig['其他'];

    // Render details based on item type
    const renderDetails = () => {
        switch (item.type) {
            case '景點':
                return (
                    <>
                        {item.description && <p className="text-sm mb-3 leading-relaxed">{item.description}</p>}
                        {item.tips && (
                            <div className="bg-pink-50 p-3 rounded-lg mb-3 border border-pink-100">
                                <h4 className="text-sm font-bold mb-1 text-pink-800">小提示</h4>
                                <p className="text-xs leading-relaxed">{item.tips}</p>
                            </div>
                        )}
                        {item.location && (
                            <div className="flex items-center text-xs text-pink-500 mt-2">
                                <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2c-3.31 0-6 2.69-6 6 0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6zm0 9a3 3 0 100-6 3 3 0 000 6z"></path>
                                </svg>
                                <a
                                    href={item.location}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-pink-700 transition-colors font-medium"
                                    aria-label={`在 Google Maps 中查看 ${item.name} 的位置`}
                                >
                                    在 Google Maps 中查看位置
                                </a>
                            </div>
                        )}
                    </>
                );
            case '交通':
                return (
                    <div className="space-y-4">
                        {/* Summary */}
                        <div className="flex items-center bg-purple-50 p-3 rounded-lg">
                            <div className="flex-1">
                                <p className="text-sm font-medium text-purple-700">{item.from}</p>
                                <p className="text-xs text-purple-500">{item.departure_time}</p>
                            </div>
                            <svg className="w-5 h-5 mx-2 text-purple-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7"></path>
                            </svg>
                            <div className="flex-1 text-right">
                                <p className="text-sm font-medium text-purple-700">{item.to}</p>
                                <p className="text-xs text-purple-500">{item.arrival_time}</p>
                            </div>
                        </div>
                        {/* Transfer note */}
                        {item.trains && item.trains.length > 1 && (
                            <div className="bg-purple-50 p-2 rounded-lg mb-3 border border-purple-100">
                                <p className="text-xs text-purple-700 flex items-center">
                                    <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                    </svg>
                                    此行程需要轉乘 {item.trains.length - 1} 次
                                </p>
                            </div>
                        )}
                        {/* Timeline */}
                        {item.trains && item.trains.length > 0 && <TransportTimeline trains={item.trains} />}
                        {/* Description */}
                        {item.description && (
                            <div className="mt-3 text-sm bg-purple-50 p-3 rounded-lg border border-purple-100">
                                <p>{item.description}</p>
                            </div>
                        )}
                    </div>
                );
            case '餐廳':
                return (
                    <>
                        {item.description && <p className="text-sm mb-3">{item.description}</p>}
                        {item.recommended_dishes && (
                            <div className="bg-pink-50 p-3 rounded-lg mb-3 border border-pink-100">
                                <h4 className="text-sm font-medium mb-1 text-pink-800">推薦菜色</h4>
                                <p className="text-xs">{item.recommended_dishes}</p>
                            </div>
                        )}
                        {item.location && (
                            <div className="flex items-center text-xs text-pink-500 mt-2">
                                <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 2c-3.31 0-6 2.69-6 6 0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6zm0 9a3 3 0 100-6 3 3 0 000 6z"></path>
                                </svg>
                                <a
                                    href={item.location}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="underline hover:text-pink-700 transition-colors"
                                    aria-label={`在 Google Maps 中查看 ${item.name} 的位置`}
                                >
                                    在 Google Maps 中查看位置
                                </a>
                            </div>
                        )}
                    </>
                );
            default:
                return (
                    <>
                        {item.description && <p className="text-sm">{item.description}</p>}
                    </>
                );
        }
    };

    return (
        <div className="mb-3 relative">
            {/* Itinerary card */}
            <motion.div
                className="ml-2 bg-white rounded-lg shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
            >
                {/* Card header */}
                <div
                    className={`p-3 flex justify-between items-center cursor-pointer ${config.background}`}
                    onClick={toggleExpand}
                    aria-expanded={isExpanded}
                    aria-controls={`itinerary-details-${index}`}
                >
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${config.iconClass}`}>
                            {config.icon}
                        </div>
                        <div>
                            <h3 className="font-bold">{item.name}</h3>
                            {item.time && <p className="text-xs text-pink-500 font-medium">{item.time}</p>}
                        </div>
                    </div>
                    <svg
                        className={`w-5 h-5 text-pink-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <path d="M6 9l6 6 6-6"></path>
                    </svg>
                </div>
                {/* Expanded content */}
                <AnimatePresence initial={false}>
                    {isExpanded && (
                        <motion.div
                            id={`itinerary-details-${index}`}
                            className="overflow-hidden"
                            style={{ willChange: "height, opacity" }}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                                height: { type: 'spring', stiffness: 200, damping: 30 },
                                opacity: { duration: 0.2 },
                            }}
                        >
                            <div className="p-4 border-t border-pink-100">{renderDetails()}</div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

// Transport Timeline Component
interface TransportTimelineProps {
    trains: Train[];
}

const TransportTimeline: React.FC<TransportTimelineProps> = ({ trains }) => {
    const timelineRef = useRef<HTMLDivElement>(null);
    const [timeColumnWidth, setTimeColumnWidth] = useState<number | null>(null);

    // 使用 ResizeObserver 動態計算時間欄的最大寬度
    useEffect(() => {
        if (!timelineRef.current) return;

        const timeColumns = timelineRef.current.querySelectorAll('.time-column');
        if (!timeColumns.length) {
            setTimeColumnWidth(null); // 如果沒有時間欄，重置寬度
            return;
        }

        const observer = new ResizeObserver((entries) => {
            let maxWidth = 0;
            entries.forEach((entry) => {
                const width = entry.contentRect.width;
                if (width > maxWidth) maxWidth = width;
            });
            setTimeColumnWidth(maxWidth);
        });

        timeColumns.forEach((column) => observer.observe(column));

        // 在元件卸載或 trains 改變時清理 observer
        return () => {
            observer.disconnect();
        };
    }, [trains]);

    // 根據 timeColumnWidth 定位時間線
    useEffect(() => {
        if (!timelineRef.current || timeColumnWidth === null) return;

        const blocks = timelineRef.current.querySelectorAll('.timeline-block');
        blocks.forEach((block) => {
            const firstCircle = block.querySelector('.station-circle-first');
            const timelineLine = block.querySelector('.timeline-line');
            if (firstCircle && timelineLine) {
                const circleRect = firstCircle.getBoundingClientRect();
                const blockRect = block.getBoundingClientRect();
                const centerX = Math.round(
                    circleRect.left - blockRect.left + circleRect.width / 2 - TIMELINE_LINE_WIDTH_PX / 2
                );
                (timelineLine as HTMLElement).style.left = `${centerX}px`;
            }
        });
    }, [trains, timeColumnWidth]);

    // 將火車資料分組為區塊
    const transportBlocks = useMemo(() => {
        type StationInfo = {
            station: string;
            arrivalTime?: string;
            departureTime?: string;
            isStart?: boolean;
            isEnd?: boolean;
            trainDeparture?: number;
        };
        type TransportBlock = {
            stations: StationInfo[];
        };
        const blocks: TransportBlock[] = [];
        trains.forEach((train, idx) => {
            const isNewBlock = idx === 0 || train.from !== blocks.at(-1)!.stations.at(-1)!.station;
            if (isNewBlock) {
                blocks.push({
                    stations: [
                        {
                            station: train.from,
                            departureTime: train.departureTime,
                            isStart: idx === 0,
                            trainDeparture: idx,
                        },
                    ],
                });
            } else {
                const prevStation = blocks.at(-1)!.stations.at(-1)!;
                prevStation.departureTime = train.departureTime;
                prevStation.trainDeparture = idx;
            }
            blocks.at(-1)!.stations.push({
                station: train.to,
                arrivalTime: train.arrivalTime,
                isEnd: idx === trains.length - 1,
            });
        });
        return blocks;
    }, [trains]);

    return (
        <div>
            <h4 className="text-sm font-bold text-purple-700 mb-4 flex items-center">
                <svg className="w-4 h-4 mr-1 text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    <path d="M9 14h6"></path>
                    <path d="M9 18h6"></path>
                    <path d="M9 10h6"></path>
                </svg>
                轉乘行程
            </h4>
            <div ref={timelineRef}>
                {transportBlocks.map((block, blockIdx) => (
                    <Fragment key={`transport-block-${blockIdx}`}>
                        {blockIdx > 0 && (
                            <div className="relative timeline-block">
                                <div className="grid grid-cols-[minmax(auto,max-content)_auto_1fr] items-center">
                                    <div className="timeline-line absolute border-l-2 border-purple-300 border-dashed -top-2 -bottom-2 z-0" style={{ width: `${TIMELINE_LINE_WIDTH_PX}px` }}></div>
                                    <div className="time-column mr-2" style={timeColumnWidth ? { width: timeColumnWidth, minWidth: timeColumnWidth } : {}}></div>
                                    <div className="flex justify-center relative station-circle-first">
                                        <div className="w-4 h-4 rounded-full border-2 border-solid z-10 opacity-0"></div>
                                    </div>
                                    <div className="pl-2 py-2">
                                        <svg className="w-5 h-5 mr-1 text-purple-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="currentColor" stroke="none">
                                            <path d="M9.5 7.063c0-1.25-1.031-2.281-2.313-2.281-1.25 0-2.25 1.031-2.25 2.281 0 1.281 1 2.281 2.25 2.281 1.281 0 2.313-1 2.313-2.281zM7.031 27.188h-2.031s-0.094-5.781 0.063-6.469c0.125-0.688 1.469-2.125 1.531-2.688 0.063-0.594-0.531-3.031-0.531-3.031s-1.344 1.219-1.781 1.438-3.875 0.781-3.875 0.781l-0.406-1.75s3.281-0.719 3.75-1.094c0.469-0.344 1.719-3.375 2.656-3.75 0.625-0.281 2.313-0.156 3.156-0.156 0.875 0 3.75 1.656 4.031 2.031 0.313 0.344 2.031 3.719 2.031 3.719l-1.563 0.875-1.25-2.688s-0.969-0.813-1.344-0.938c-0.406-0.125-0.938-0.281-1.031 0.063-0.125 0.313 0.719 2.875 0.938 3.594 0.188 0.75 1.219 4.156 1.594 4.875s2.594 3.906 2.594 3.906l-1.906 1.25s-2.719-3.688-3.063-4.219c-0.375-0.531-1.438-3.375-1.438-3.375s-1.813 2.219-1.969 2.906c-0.125 0.625-0.156 4.719-0.156 4.719z"></path>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="relative timeline-block">
                            <div className="grid grid-cols-[minmax(auto,max-content)_auto_1fr] items-center relative">
                                <div className="timeline-line absolute bg-purple-300 top-2 bottom-2 z-0" style={{ width: `${TIMELINE_LINE_WIDTH_PX}px` }}></div>
                                {block.stations.flatMap((station, stationIdx) => {
                                    const result = [
                                        <div key={`station-time-${blockIdx}-${stationIdx}`} className="text-right mr-2 time-column" style={timeColumnWidth ? { width: timeColumnWidth, minWidth: timeColumnWidth } : {}}>
                                            {station.arrivalTime && (
                                                <div className="text-xs text-purple-600 font-semibold">{station.arrivalTime}</div>
                                            )}
                                            {station.departureTime && (
                                                <div className="text-xs text-purple-600 font-semibold">{station.departureTime}</div>
                                            )}
                                        </div>,
                                        <div key={`station-circle-${blockIdx}-${stationIdx}`} className="flex justify-center relative">
                                            <div className={`w-4 h-4 rounded-full border-2 border-solid bg-white z-10 ${station.isStart || station.isEnd ? 'border-purple-500' : 'border-purple-300'} ${stationIdx === 0 ? 'station-circle-first' : ''}`}></div>
                                        </div>,
                                        <div key={`station-name-${blockIdx}-${stationIdx}`} className="pl-2">
                                            <div className={`font-medium text-sm ${station.isStart || station.isEnd ? 'text-purple-700' : 'text-purple-600'}`}>{station.station}</div>
                                        </div>,
                                    ];
                                    if (station.trainDeparture !== undefined) {
                                        result.push(
                                            <div key={`train-time-${blockIdx}-${stationIdx}`} className="text-right mr-2 time-column" style={timeColumnWidth ? { width: timeColumnWidth, minWidth: timeColumnWidth } : {}}></div>,
                                            <div key={`train-circle-${blockIdx}-${stationIdx}`} className="flex justify-center relative"></div>,
                                            <div key={`train-info-${blockIdx}-${stationIdx}`} className="pl-2 my-3">
                                                <div className="py-2 px-3 bg-white rounded-lg shadow-sm border border-purple-100 text-xs inline-block hover:bg-purple-50 transition-all duration-200">
                                                    <div className="font-medium text-purple-700 whitespace-nowrap text-xs">{trains[station.trainDeparture].trainNumber}</div>
                                                    {trains[station.trainDeparture].isReserved && (
                                                        <div className="flex items-center text-green-600 text-xs mt-1 whitespace-nowrap">
                                                            <svg className="w-3 h-3 mr-1 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                                            </svg>
                                                            已預訂
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    }
                                    return result;
                                })}
                            </div>
                        </div>
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default ItineraryItemCard;