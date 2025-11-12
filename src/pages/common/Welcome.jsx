import { ProCard, StatisticCard } from '@ant-design/pro-components';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '@/stores/userStore';
import dayjs from 'dayjs';

function Welcome() {
  const { t } = useTranslation();
  const { userInfo } = useUserStore();
  const [nowTime, setNowTime] = useState(null);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    firstPaint: 0,
    firstContentfulPaint: 0,
    largestContentfulPaint: 0,
    domContentLoaded: 0,
    loadTime: 0,
    resourceLoadTime: 0,
    memoryUsage: 0,
  });

  // 设置当前时间
  useEffect(() => {
    const timer = setInterval(() => {
      setNowTime(dayjs().format('YYYY-MM-DD HH:mm:ss'));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // 收集性能指标
  useEffect(() => {
    // 确保浏览器支持Performance API
    if (window.performance) {
      // 获取基本性能数据
      const performance = window.performance;
      
      // 使用Navigation Timing Level 2 API替代已弃用的timing
      const navigationEntries = performance.getEntriesByType('navigation');
      const navigationEntry = navigationEntries.length > 0 ? navigationEntries[0] : null;

      // 计算页面加载指标
      const firstPaint = 
        performance
          .getEntriesByType('paint')
          ?.find((entry) => entry.name === 'first-paint')?.startTime || 0;
      const firstContentfulPaint = 
        performance
          .getEntriesByType('paint')
          ?.find((entry) => entry.name === 'first-contentful-paint')
          ?.startTime || 0;
      
      // 使用新API计算导航指标
      const domContentLoaded = navigationEntry ? 
        Math.round(navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime) : 0;
      const loadTime = navigationEntry ? 
        Math.round(navigationEntry.loadEventEnd - navigationEntry.startTime) : 0;

      // 计算资源加载时间
      const resources = performance.getEntriesByType('resource');
      const resourceLoadTime = 
        resources.reduce(
          (total, resource) =>
            total + (resource.responseEnd - resource.startTime),
          0,
        ) / (resources.length || 1);

      // 初始设置性能指标
      setPerformanceMetrics((prev) => ({
        ...prev,
        firstPaint: Math.round(firstPaint),
        firstContentfulPaint: Math.round(firstContentfulPaint),
        domContentLoaded,
        loadTime,
        resourceLoadTime: Math.round(resourceLoadTime),
      }));

      // 监听Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((entries) => {
        entries.getEntries().forEach((entry) => {
          setPerformanceMetrics((prev) => ({
            ...prev,
            largestContentfulPaint: Math.round(
              entry.renderTime || entry.loadTime || 0,
            ),
          }));
        });
      });

      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

      // 定期更新内存使用情况 (使用更可靠的方式)
      const memoryTimer = setInterval(() => {
        // 检查是否支持memory API
        if (window.performance && window.performance.memory) {
          const memory = window.performance.memory;
          const memoryUsage = (
            (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * // 使用jsHeapSizeLimit替代totalJSHeapSize
            100
          ).toFixed(2);
          setPerformanceMetrics((prev) => ({
            ...prev,
            memoryUsage: parseFloat(memoryUsage),
          }));
        }
      }, 3000);

      return () => {
        lcpObserver.disconnect();
        clearInterval(memoryTimer);
      };
    }
  }, []);

  return (
    <div>
      <ProCard bordered hoverable>
        <div>
          <h2 className="text-3xl font-bold">
            <span className=" text-primary">{userInfo?.user_name}</span>{' '}
            {t('welcome.text')}
          </h2>
          <p className="mt-2 text-xl">
            {t('welcome.date')}
            {nowTime}
          </p>
        </div>
      </ProCard>

      <div className="mt-4">
        <ProCard
          bordered
          hoverable
          split="horizontal"
          title={t('welcome.performanceMetrics')}
          subTitle={t('welcome.performanceSubtitle')}
        >
          <ProCard split="vertical">
            <StatisticCard
              statistic={{
                title: t('welcome.firstPaint'),
                value: performanceMetrics.firstPaint,
                description: t('welcome.firstPaintDesc'),
              }}
            />
            <StatisticCard
              statistic={{
                title: t('welcome.firstContentfulPaint'),
                value: performanceMetrics.firstContentfulPaint,
                description: t('welcome.firstContentfulPaintDesc'),
              }}
            />
            <StatisticCard
              statistic={{
                title: t('welcome.largestContentfulPaint'),
                value: performanceMetrics.largestContentfulPaint,
                description: t('welcome.largestContentfulPaintDesc'),
              }}
            />
          </ProCard>
          <ProCard split="vertical">
            <StatisticCard
              statistic={{
                title: t('welcome.domContentLoaded'),
                value: performanceMetrics.domContentLoaded,
                description: t('welcome.domContentLoadedDesc'),
              }}
            />
            <StatisticCard
              statistic={{
                title: t('welcome.loadTime'),
                value: performanceMetrics.loadTime,
                description: t('welcome.loadTimeDesc'),
              }}
            />
            <StatisticCard
              statistic={{
                title: t('welcome.resourceLoadTime'),
                value: performanceMetrics.resourceLoadTime,
                description: t('welcome.resourceLoadTimeDesc'),
              }}
            />
          </ProCard>
          <ProCard>
            <StatisticCard
              statistic={{
                title: t('welcome.memoryUsage'),
                value: performanceMetrics.memoryUsage,
                description: t('welcome.memoryUsageDesc'),
              }}
            />
          </ProCard>
        </ProCard>
      </div>
    </div>
  );
}

export default Welcome;
