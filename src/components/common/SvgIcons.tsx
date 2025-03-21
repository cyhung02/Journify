// src/components/common/SvgIcons.tsx

// 定義圖示元件的共通屬性類型
interface IconProps {
    size?: number | string;
    className?: string;
    color?: string;
}

// 櫻花圖示
export const SakuraIcon: React.FC<IconProps> = ({ size = 24, className = "" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="42.67 42.67 426.67 426.67"
        className={className}
    >
        <g fill="#F9A8D4">
            <path d="M311.531 234.71c34.918 10.318 23.86-45.707-4.306-22.06-1.387 1.166-1.839.915-.61-.57 23.104-27.897-34.74-37.821-21.932-2.29.301.834.013.941-.465.145-19.999-33.407-48.634 21.106-9.916 19.396 1.627-.072 1.726.31.157.671-36.891 8.54 10.065 50.868 15.96 15.543.276-1.645.496-1.398.555.369 1.126 33.256 49.8 5.363 20.363-10.53-1.767-.957-1.734-1.246.194-.674zm-10.312-6.048c-1.915-.288-2.54.749-1.391 2.307 1.147 1.558 1.342 3.385.43 4.058s-2.602-.05-3.75-1.607-2.327-1.267-2.616.647c-.287 1.915-1.443 3.344-2.566 3.173-1.122-.17-1.804-1.874-1.516-3.788s-.75-2.54-2.306-1.39c-1.557 1.149-3.384 1.342-4.058.429-.674-.913.05-2.6 1.607-3.75 1.556-1.15 1.265-2.327-.65-2.615-1.915-.288-3.342-1.444-3.171-2.567.17-1.121 1.874-1.804 3.789-1.516 1.914.288 2.539-.748 1.39-2.306-1.149-1.56-1.341-3.384-.43-4.06.915-.673 2.602.05 3.75 1.609 1.149 1.557 2.326 1.265 2.614-.649.29-1.914 1.444-3.342 2.567-3.172s1.805 1.873 1.516 3.788c-.288 1.914.75 2.54 2.307 1.39 1.556-1.15 3.385-1.343 4.057-.43.674.915-.05 2.603-1.605 3.752-1.557 1.147-1.267 2.326.648 2.614 1.915.288 3.342 1.443 3.172 2.566-.17 1.124-1.873 1.805-3.788 1.517zM192.153 360.993c27.892 8.24 19.06-36.51-3.44-17.62-1.108.93-1.47.73-.487-.457 18.456-22.288-27.75-30.213-17.52-1.828.24.666.01.752-.371.116-15.975-26.688-38.851 16.859-7.92 15.494 1.298-.056 1.379.245.124.536-29.47 6.82 8.04 40.635 12.751 12.417.22-1.316.395-1.116.443.294.901 26.568 39.783 4.287 16.268-8.413-1.413-.765-1.388-.994.152-.539zm-8.236-4.833c-1.53-.23-2.029.6-1.11 1.845.918 1.244 1.071 2.703.342 3.241-.729.54-2.078-.038-2.996-1.283s-1.858-1.013-2.088.517c-.231 1.529-1.153 2.67-2.05 2.534-.896-.136-1.441-1.498-1.21-3.027.23-1.529-.6-2.028-1.844-1.11-1.244.919-2.703 1.072-3.24.343-.54-.73.038-2.079 1.283-2.994 1.244-.919 1.011-1.857-.518-2.088-1.529-.232-2.67-1.153-2.534-2.05.135-.896 1.497-1.441 3.025-1.21 1.53.23 2.03-.6 1.111-1.845-.918-1.245-1.072-2.702-.343-3.243.73-.539 2.078.04 2.996 1.287.918 1.244 1.858 1.01 2.09-.519.23-1.529 1.152-2.67 2.049-2.534s1.441 1.497 1.21 3.027c-.23 1.529.599 2.028 1.843 1.108 1.245-.918 2.704-1.07 3.242-.343.54.731-.039 2.08-1.283 2.996-1.245.919-1.012 1.857.517 2.09 1.53.23 2.67 1.152 2.534 2.049-.137.895-1.498 1.442-3.026 1.21zM369.767 283.408c28.212 8.338 19.277-36.926-3.478-17.822-1.121.942-1.484.737-.493-.461 18.666-22.54-28.066-30.557-17.72-1.852.245.673.01.762-.375.118-16.155-26.99-39.294 17.05-8.01 15.67 1.315-.058 1.396.248.128.543-29.805 6.897 8.13 41.097 12.895 12.556.222-1.33.4-1.129.449.298.911 26.869 40.234 4.333 16.45-8.507-1.432-.77-1.404-1.003.154-.543zm-8.331-4.887c-1.547-.232-2.052.608-1.124 1.865.928 1.258 1.085 2.733.348 3.28-.736.544-2.102-.04-3.03-1.298-.928-1.258-1.88-1.024-2.113.523-.235 1.548-1.167 2.7-2.073 2.564-.908-.135-1.458-1.514-1.224-3.059.234-1.548-.607-2.05-1.864-1.123s-2.733 1.085-3.28.347c-.544-.738.04-2.1 1.298-3.03 1.257-.928 1.023-1.88-.523-2.114-1.548-.232-2.7-1.165-2.565-2.072.136-.91 1.516-1.458 3.06-1.224 1.547.233 2.052-.606 1.123-1.864-.929-1.257-1.084-2.734-.347-3.28.737-.544 2.102.041 3.03 1.298.927 1.258 1.88 1.025 2.113-.523.233-1.548 1.167-2.7 2.073-2.564.908.137 1.458 1.514 1.225 3.06-.235 1.547.605 2.05 1.862 1.123 1.257-.928 2.734-1.085 3.28-.348.543.738-.04 2.1-1.297 3.03-1.258.928-1.025 1.88.523 2.112 1.547.235 2.7 1.169 2.565 2.076-.136.905-1.514 1.456-3.06 1.221zM431.127 182.467c32.969 9.743 22.528-43.156-4.067-20.827-1.31 1.1-1.737.863-.576-.54 21.814-26.341-32.8-35.71-20.71-2.162.284.788.014.89-.436.137-18.883-31.544-45.922 19.929-9.361 18.313 1.534-.067 1.63.292.146.634-34.832 8.064 9.504 48.03 15.07 14.677.26-1.556.47-1.32.525.348 1.066 31.4 47.022 5.064 19.227-9.944-1.67-.904-1.64-1.175.182-.636zm-11.028-6.524c-1.523-.23-2.024.597-1.107 1.838s1.07 2.697.343 3.235c-.73.536-2.073-.04-2.988-1.282-.916-1.24-1.855-1.009-2.082.517-.23 1.525-1.15 2.663-2.044 2.528-.895-.135-1.44-1.492-1.209-3.019.23-1.525-.598-2.025-1.839-1.108-1.242.916-2.696 1.07-3.234.343-.538-.729.04-2.073 1.281-2.989 1.241-.916 1.01-1.854-.516-2.084-1.525-.23-2.663-1.15-2.53-2.044.135-.894 1.493-1.438 3.02-1.208 1.524.23 2.023-.597 1.106-1.838s-1.069-2.697-.342-3.233c.728-.538 2.073.039 2.987 1.28.917 1.24 1.855 1.009 2.083-.517.23-1.525 1.15-2.663 2.044-2.528.894.135 1.439 1.494 1.208 3.019-.23 1.525.596 2.025 1.84 1.108 1.24-.916 2.695-1.07 3.232-.343.538.729-.039 2.075-1.28 2.99-1.242.917-1.009 1.853.515 2.083 1.525.23 2.663 1.15 2.53 2.044-.134.895-1.491 1.438-3.018 1.208z" /><path fill="#F5CACA" d="M380.732 207.348c1.252-.966.594-1.554.246-1.931-3.504-3.818-5.933-8.524-6.492-13.414-.013-.116-.025-.241-.038-.372-.044-.495-.341-1.561-1.682-.751-9.989 6.351-18.92 11.726-32.246 18.96-1.567 1.117-.775 1.818-.545 2.39a26.888 26.888 0 0 1 1.935 9.957c0 2.361-.301 4.592-.868 6.666-.142.527.16 1.21 1.83.334 15.85-8.302 26.192-14.49 37.86-21.839z" />
            <g fill="#F5CACA">
                <path d="M402.706 257.094c-3.892 1.346-5.101 1.898-8.872 3.117-2.006.62-.828 1.786-.486 2.447a23.216 23.216 0 0 1 2.433 8.01c.053.444.04 1.355 1.136.98a303.487 303.487 0 0 0 9.711-3.501c.389-.146 1.251-.566.912-1.194l-3.59-9.46c-.005.003-.236-.748-1.244-.4zM318.134 277.757a17.904 17.904 0 0 1-1.758-4.253c-.128-.468-.224-1.443-1.57-1.443-10.393-.203-18.467-1.062-26.428-2.226-10.434-1.522-18.123-3.246-25.39-5.305-.76-.364-.69-.56.154-.845.772-.328-.054-1.121-.585-1.536-4.652-3.61-8.28-8.594-9.823-14.001-.176-.614-.478-1.765-2.474-1.338-52.449 13.625-110.245 18.32-171.054-.346 0 0-4.553-.976-5.093 3.864a1215.562 1215.562 0 0 1-1.968 16.214c-.866 6.773 2.443 7.106 2.443 7.106 14.398 4.418 23.532 6.25 38.935 8.05a8.563 8.563 0 0 1 4.385 1.539c10.985 7.701 25.849 20.344 37.135 40.444.5.772 1.07.508 1.43.463a17.463 17.463 0 0 1 2.228-.151c1.069 0 2.24.091 3.478.344.39.08.573.02.727-.232.415-.671.764-1.331 1.165-1.902 1.384-1.969 2.712-3.327 4.734-4.594.5-.334.235-.754.139-.994-5.4-13.37-12.008-24.08-19.295-31.522-.411-.419-.932-.978.418-1.232 16.058 0 30.901-1.315 47.765-3.958 7.89-1.238 15.872-2.781 23.925-4.597.89-.202 1.997-.374 4.237-.374 17.485 2.661 41.341 6.206 59.753 8.937 9.456 1.401 20.657 2.375 33.37 2.42 1.237-.016 1.354-.55 1.428-.828.221-.839.508-1.67.878-2.493.116-.257.02-.988-.694-1.784-1.124-1.255-2.008-2.413-2.595-3.427z" />
            </g>
        </g>
    </svg>
);

// 地點圖示
export const LocationIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 2C8.69 2 6 4.69 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6zm0 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
    </svg>
);

// 餐飲圖示
export const FoodIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
    </svg>
);

// 購物圖示
export const ShoppingIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
);

// 交通圖示
export const TransportIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M15.05 28.695a2.4 2.4 0 1 0 2.4 2.39 2.4 2.4 0 0 0-2.4-2.39Zm18.198 0a2.4 2.4 0 1 0 2.391 2.39 2.4 2.4 0 0 0-2.39-2.39ZM24.141 4.5a30.052 30.052 0 0 1 5.23.438 23.777 23.777 0 0 1 5.917 1.813 5.777 5.777 0 0 1 2.67 1.992 6.447 6.447 0 0 1 .7 2.246l1.527.03c2.48-.207 2.428 5.352-.127 5.223-.034 3.168-.07 4.6.022 5.322v16.814H37.4v2.68c.215 3.256-4.787 3.256-4.572 0v-2.68H15.455v2.68c.215 3.256-4.787 3.256-4.572 0v-2.68h-2.68V21.564l.113-5.342c-2.909.33-3.243-5.455-.127-5.223l1.478-.153a5.618 5.618 0 0 1 .628-2.102 5.777 5.777 0 0 1 2.67-1.992 23.779 23.779 0 0 1 5.917-1.813 30.052 30.052 0 0 1 5.26-.439Zm-10.499 6.824a1.404 1.404 0 0 0-1.345 1.215l.025 9.328a1.404 1.404 0 0 0 1.155 1.583h21.16a1.414 1.414 0 0 0 1.415-1.375 1.22 1.22 0 0 0 0-.189l-.047-9.327a1.405 1.405 0 0 0-1.395-1.215H13.692Z" />
    </svg>
);

// 箭頭向上圖示
export const ArrowUpIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M12 19V5m-7 7 7-7 7 7" />
    </svg>
);

// 箭頭向下圖示
export const ArrowDownIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m6 9 6 6 6-6" />
    </svg>
);

// 家/住宿圖示
export const HomeIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <path d="M9 22V12h6v10" />
    </svg>
);

// 備註/提示圖示
export const TipIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 12H3m9-9v18m-9-5 18-8M3 8l18 8M8 3l8 18m0-18L8 21" />
    </svg>
);

// 檢查/確認圖示
export const CheckIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <path d="M22 4 12 14.01l-3-3" />
    </svg>
);

// 其他/列表圖示
export const ListIcon: React.FC<IconProps> = ({ size = 24, className = "", color = "currentColor" }) => (
    <svg
        width={size}
        height={size}
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
    </svg>
);