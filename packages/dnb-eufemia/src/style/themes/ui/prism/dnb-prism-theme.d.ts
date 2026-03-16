/**
 * DNB Prism Theme
 *
 */
declare const prismTheme: {
    plain: {
        color: string;
        backgroundColor: string;
    };
    styles: ({
        types: string[];
        style: {
            color: string;
            fontStyle: "italic";
            opacity?: undefined;
        };
    } | {
        types: string[];
        style: {
            color: string;
            fontStyle: "italic";
            opacity: number;
        };
    } | {
        types: string[];
        style: {
            color: string;
            fontStyle?: undefined;
            opacity?: undefined;
        };
    })[];
};
export default prismTheme;
