import qs from 'querystring';
import { message } from 'antd';

type downloadFileOptions = {
    url: string,
    method?: "get" | "post",
    data?: {
        [k: string]: any,
    },
    headers?: {
        Authorization?: string;
        [k: string]: any;
    },
    fileName?: string; // eg:xxxyyy.xlsx
    callback?: (downloading: boolean) => void;
};

export const exportUtils = {
    // response.setContentType("application/application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"); //设置文件类型，这里以.xlsx为例
    //设置文件的原文件名，若文件名中含有中文则需要解码，否则会出现乱码
    // response.setHeader("Content-Disposition", "attachment;fileName=" + URLEncoder.encode(fileName, "utf-8"));
    // 这步很关键，需要在给前端返回的请求头中添加Content-Disposition字段
    // response.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
    downloadFile: async ({
        url,
        method = "get",
        data = {},
        headers = {},
        fileName,
        callback,
    }: downloadFileOptions) => {
        const params = method === "post" ? { body: JSON.stringify(data) } : {};
        const queryUrl = method === "get" ? `${url}?${qs.stringify(data)}` : url;
        if (typeof callback === "function") {
            callback(true);
        }
        const response: any = await fetch(queryUrl, {
            method,
            ...params,
            // @ts-ignore
            headers: {
                ...headers,
                "Content-Type": 'application/json',
            }
        });
        if (response.status === 200) {
            let newFileName;
            if (fileName && fileName.indexOf(".") > 0) {
                newFileName = fileName;
            } else {
                try {
                    if (response.headers.get("content-disposition")) {
                        newFileName = response.headers.get("content-disposition").split(";")[1].split("filename=")[1];
                    }
                } catch (error) {
                    console.log("exportUtils Error:", error);
                }
            }
            if (!newFileName) {
                if (typeof callback === "function") callback(false);
                message.info("文件名称为空");
                return;
            }
            const fileBlob = await response.blob();
            if (fileBlob.size === 0) {
                if (typeof callback === "function") callback(false);
                message.info("文件下载失败");
                return;
            }
            if (typeof callback === "function") callback(false);
            const blob = new Blob([fileBlob], { type: "application/octet-stream" });
            const objectURL = URL.createObjectURL(blob);
            let btn: any = document.createElement('a');
            btn.download = decodeURI(newFileName);
            btn.href = objectURL;
            btn.click();
            URL.revokeObjectURL(objectURL);
            btn = null;
        }
    }
};