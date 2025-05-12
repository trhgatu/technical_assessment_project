import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
const LoadingComponent = () => {
    return (
        <div className="h-screen flex items-center justify-center">
            <Spin indicator={<LoadingOutlined spin />} size="large" />
        </div>
    );
}
export default LoadingComponent