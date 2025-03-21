import { getVideos } from '@/services/ant-design-pro/video';
import { SearchOutlined } from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Card, Col, Input, Row, Spin } from 'antd';
import React, { useEffect, useState } from 'react';

// 视频卡片组件
const VideoCard: React.FC<{
  title: string;
  thumbnail: string;
  channel: string;
  views: string;
  uploaded: string;
}> = ({ title, thumbnail, channel, views, uploaded }) => {
  return (
    <Card hoverable cover={<img alt={title} src={thumbnail} />} style={{ borderRadius: 8 }}>
      <Card.Meta title={title} description={`${channel} · ${views} · ${uploaded}`} />
    </Card>
  );
};

const Home: React.FC = () => {
  const [videoData, setVideoData] = useState<API.VideoListItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const response = await getVideos();
      return response.data;
    } catch (error) {
      console.error('Error fetching videos:', error);
      return [];
    }
  };

  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      const videos = await fetchVideos();
      if (videos) {
        setVideoData(videos);
      }
      setLoading(false);
    };
    loadVideos();
  }, []);

  return (
    <ProLayout
      menuRender={false}
      logo="VideoTube"
      headerContentRender={() => (
        <div style={{ paddingRight: 24 }}>
          <Input placeholder="搜索视频" prefix={<SearchOutlined />} style={{ width: 300 }} />
        </div>
      )}
    >
      <PageContainer header={{ ghost: true }}>
        {loading ? (
          <Spin size="large" style={{ display: 'block', textAlign: 'center', marginTop: 50 }} />
        ) : (
          <Row gutter={[16, 16]}>
            {videoData.map((video) => (
              <Col xs={24} sm={12} md={8} lg={6} key={video.id}>
                <VideoCard
                  title={video.title}
                  thumbnail={video.thumbnail}
                  channel={video.channel}
                  views={video.views}
                  uploaded={video.uploaded}
                />
              </Col>
            ))}
          </Row>
        )}
      </PageContainer>
    </ProLayout>
  );
};

export default Home;
