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
            url: "/xg_api/as_api/academic_ymd/export_md",
            method: "post",
            data: {
                nj: '2019'
            },
            headers: {
                Authorization: "eyJhbGciOiJIUzUxMiJ9.eyJ1c2VyX2lkIjoiYmIyYmMyNGIyYjM5NDI5ZmI1NWM4M2ZiOWUxNzY5ZTUiLCJ1c2VyX2tleSI6IjE0ZmM4MDEzMDhlOTQ2NTRiYzFjOTQ4NTg3NWRmZmFjIiwidXNlcm5hbWUiOiJZSlNERVBUIn0.N6BT6OIf6VFTNQpDppE0L0IlUKIph6Glq4BHduzuXgOpWfptXQ2iGh5ZjZsov-AZMsFVdktCZW41pitHz6w_WA"
            },
            callback: (downloading) => {
                setState({ loading: downloading });
            },
            fileName: "测试.xlsx"
        });
    }
    return (
        <Spin spinning={loading}>
            <Button onClick={onClick}>测试</Button>
        </Spin>
    );
};
export default ImportButton;