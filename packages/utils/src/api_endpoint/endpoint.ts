let apiMap = new Map<number, string>();
let apikeyName = new Map<number, string>();

// Constant
const SNOWTRACE_KEY = 'TU89MJYM6DEIUTIIQ5R4KUSZC9XYN2QYMP';
const snowtraceEndpoint = 'https://api.snowtrace.io/api?module=contract&action=getabi';

// put
apiMap.set(43114, snowtraceEndpoint);
apiMap.set(43114, SNOWTRACE_KEY);
