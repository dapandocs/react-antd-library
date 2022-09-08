import {
    Button,
    Spin,
} from 'antd';
import { useSetState } from 'ahooks';
import { exportUtils } from '../../../../src';

const ImportButton = () => {
    const [state, setState] = useSetState({
        loading: false,
    });
    const { loading } = state;
    const onClick = () => {
        exportUtils.downloadFile({
            // url: "/xg_api/as_api/import_ymd/download_template",
            url: "/xg_api/as_api/academic_ymd/export_md",
            method: "post",
            data: {
                nj: '2019'
            },
            headers: {
                Authorization: "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiYmIyYmMyNGIyYjM5NDI5ZmI1NWM4M2ZiOWUxNzY5ZTUiLCJ1c2VyX2tleSI6ImRlZTc0ODIzNjAwMTQyNGFhOTgwZTBhNTZjYmU1ZjM2IiwidXNlcm5hbWUiOiJZSlNERVBUIn0.gCKEYoWYp1qA1RTikawlKFnx6kHASU9QiekVl_walCktnpDp3yByxvQ2bqQVUkF-_KbJ6FTEbiNGE-2hZWinxQ"
            },
            callback: (downloading) => {
                setState({ loading: downloading });
            },
            fileName: "测试.xls"
        });
    }
    return (
        <Spin spinning={loading}>
            <Button onClick={onClick}>测试</Button>
        </Spin>
    );
};
export default ImportButton;