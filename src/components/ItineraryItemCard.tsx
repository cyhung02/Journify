import { motion, AnimatePresence } from 'framer-motion';
import { ItineraryItem, Train } from '../data/types';
import { Fragment } from 'react';

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
    toggleExpand
}) => {
    // 基於項目類型決定卡片背景色
    const getCardBackgroundColor = () => {
        switch (item.type) {
            case '景點': return 'bg-white';
            case '交通': return 'bg-purple-50';
            case '餐廳': return 'bg-rose-50';
            case '其他':
            default: return 'bg-gray-50';
        }
    };

    // 基於項目類型決定圖標背景色和文本色
    const getIconClasses = () => {
        switch (item.type) {
            case '景點': return 'bg-pink-100 text-pink-600';
            case '交通': return 'bg-purple-100 text-purple-500';
            case '餐廳': return 'bg-rose-100 text-rose-600';
            case '其他':
            default: return 'bg-gray-100 text-gray-600';
        }
    };

    // 基於項目類型渲染適當的圖標
    const renderIcon = () => {
        switch (item.type) {
            case '景點':
                return (
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2c-3.31 0-6 2.69-6 6 0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6zm0 9a3 3 0 100-6 3 3 0 000 6z"></path>
                    </svg>
                );
            case '交通':
                return (
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                );
            case '餐廳':
                return (
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                        <line x1="6" y1="1" x2="6" y2="4"></line>
                        <line x1="10" y1="1" x2="10" y2="4"></line>
                        <line x1="14" y1="1" x2="14" y2="4"></line>
                    </svg>
                );
            case '其他':
            default:
                return (
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                    </svg>
                );
        }
    };

    // 渲染垂直時間軸 - 按區塊分組，每個區塊有獨立的垂直線
    const renderTransportTimeline = (trains: Train[]) => {
        if (!trains || trains.length === 0) return null;

        // 將列車分組為不同區塊
        type StationInfo = {
            station: string;
            time?: string;
            isStart?: boolean;
            isEnd?: boolean;
            trainDeparture?: number; // 作為某列車的出發站，存儲列車索引
        };

        type TransportBlock = {
            stations: StationInfo[];
        };

        const transportBlocks: TransportBlock[] = [];

        // 遍歷所有列車，構建區塊
        trains.forEach((train, idx) => {
            // 檢查是否需要創建新區塊
            const isNewBlock = idx === 0 || train.from !== transportBlocks.at(-1)!.stations.at(-1)!.station;
            if (isNewBlock) {
                // 創建新區塊
                transportBlocks.push({
                    stations: [
                        {
                            station: train.from,
                            time: train.departureTime,
                            isStart: idx === 0,
                            trainDeparture: idx
                        }
                    ]
                });
            } else {
                const prevStation = transportBlocks.at(-1)!.stations.at(-1)!;
                prevStation.time = train.departureTime;
                prevStation.trainDeparture = idx;
            }
            transportBlocks.at(-1)!.stations.push({
                station: train.to,
                time: train.arrivalTime,
                isEnd: idx === trains.length - 1,
            });
        });

        return (
            <div className="pt-2 pb-2">
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

                {/* 渲染每個轉乘區塊 */}
                {transportBlocks.map((block, blockIdx) => (
                    <Fragment key={`transport-block-${blockIdx}`}>
                        {/* 如果不是第一個區塊，添加步行轉乘指示 */}
                        {blockIdx > 0 && (
                            <div className="relative py-0 mb-0 grid grid-cols-[auto_auto_1fr] items-center">
                                <div></div>
                                {/* 虛線連接 */}
                                <div className="flex justify-center relative h-full">
                                    <div className="absolute -my-1 left-1/2 border-l-2 border-dashed border-purple-300 h-full transform -translate-x-1/2"></div>
                                </div>
                                <div className="pl-2 py-3">
                                    <div className="text-xs text-purple-600">步行前往下一站</div>
                                </div>
                            </div>
                        )}

                        <div className={`relative mb-0`}>
                            {/* 區塊內的垂直時間軸線 */}
                            <div className="absolute left-[46px] w-0.5 bg-purple-300 top-2 bottom-2 z-0"></div>

                            {/* 創建單一的 grid 包含站點和列車資訊 */}
                            <div className="grid grid-cols-[auto_auto_1fr] items-center">
                                {/* 將每個站點及其可能的列車資訊平鋪在同一個 grid 中 */}
                                {block.stations.flatMap((station, stationIdx) => {
                                    // 創建結果陣列，先放入站點資訊
                                    const result = [
                                        // 站點資訊 - 時間
                                        <div key={`station-time-${blockIdx}-${stationIdx}`} className="text-right mr-2">
                                            <div className="text-xs text-purple-600 font-semibold">
                                                {station.time || ''}
                                            </div>
                                        </div>,
                                        // 站點資訊 - 圓圈
                                        <div key={`station-circle-${blockIdx}-${stationIdx}`} className="flex justify-center relative">
                                            <div className={`w-4 h-4 rounded-full border-2 border-solid bg-white z-10 ${station.isStart || station.isEnd ? 'border-purple-500' : 'border-purple-300'
                                                }`}>
                                            </div>
                                        </div>,
                                        // 站點資訊 - 名稱
                                        <div key={`station-name-${blockIdx}-${stationIdx}`} className="pl-2">
                                            <div className={`font-medium text-sm ${station.isStart || station.isEnd ? 'text-purple-700' : 'text-purple-600'
                                                }`}>
                                                {station.station}
                                            </div>
                                        </div>
                                    ];

                                    // 如果是列車出發站，添加列車資訊行
                                    if (station.trainDeparture !== undefined) {
                                        result.push(
                                            // 列車資訊 - 時間欄位為空
                                            <div key={`train-time-${blockIdx}-${stationIdx}`} className="text-right mr-2"></div>,
                                            // 列車資訊 - 圓圈欄位為空
                                            <div key={`train-circle-${blockIdx}-${stationIdx}`} className="flex justify-center relative"></div>,
                                            // 列車資訊 - 詳情
                                            <div key={`train-info-${blockIdx}-${stationIdx}`} className="pl-2 mt-1 mb-3">
                                                <div className="py-2 px-4 bg-white rounded-lg shadow-sm border border-purple-100 text-xs inline-block hover:bg-purple-50 transition-all duration-200">
                                                    <div className="font-medium text-purple-700 whitespace-nowrap text-xs">
                                                        {trains[station.trainDeparture].trainNumber}
                                                    </div>
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
        );
    };

    // 根據項目類型渲染詳情內容
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
                        {/* 顯示總體交通資訊摘要 */}
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

                        {/* 多列車轉乘提示 */}
                        {item.trains && item.trains.length > 1 && (
                            <div className="bg-purple-50 p-2 rounded-lg mb-3 border border-purple-100">
                                <p className="text-xs text-purple-700 flex items-center">
                                    <svg className="w-3 h-3 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <line x1="12" y1="8" x2="12" y2="12"></line>
                                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                    </svg>
                                    此行程需要轉乘 {item.trains.length} 次
                                </p>
                            </div>
                        )}

                        {/* 垂直時間軸列車資訊 */}
                        {item.trains && item.trains.length > 0 && renderTransportTimeline(item.trains)}

                        {/* 其他資訊 */}
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

            case '其他':
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
            {/* 行程卡片 */}
            <motion.div
                className="ml-2 bg-white rounded-lg shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
            >
                {/* 卡片頭部 */}
                <div
                    className={`p-3 flex justify-between items-center cursor-pointer ${getCardBackgroundColor()}`}
                    onClick={toggleExpand}
                    aria-expanded={isExpanded}
                    aria-controls={`itinerary-details-${index}`}
                >
                    <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${getIconClasses()}`}>
                            {renderIcon()}
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

                {/* 展開內容 */}
                <AnimatePresence initial={false}>
                    {isExpanded && (
                        <motion.div
                            id={`itinerary-details-${index}`}
                            className="overflow-hidden"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                                height: { type: "spring", stiffness: 200, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                        >
                            <div className="p-4 border-t border-pink-100">
                                {renderDetails()}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default ItineraryItemCard;