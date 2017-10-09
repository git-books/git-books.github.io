+ [TiDB 简介与整体架构](overview.md)
  - [TiDB 简介](overview.md#tidb-简介)
  - [TiDB 整体架构](overview.md#tidb-整体架构)
+ [TiDB 快速入门指南](QUICKSTART.md)
  - [关于 TiDB](QUICKSTART.md#关于-tidb)
  - [关于本指南](QUICKSTART.md#关于本指南)
  - [集群部署](QUICKSTART.md#tidb-集群部署)
  - [基本操作](QUICKSTART.md#tidb-基本操作)
  - [集群监控](QUICKSTART.md#tidb-集群监控)
  - [扩容缩容](QUICKSTART.md#tidb-集群扩容缩容方案)
  - [集群销毁](QUICKSTART.md#集群销毁)
+ TiDB 运维文档
  - [软硬件环境需求](op-guide/recommendation.md)
  + 部署集群
    - [Ansible 部署方案 (强烈推荐)](op-guide/ansible-deployment.md)
    - [Docker 部署方案](op-guide/docker-deployment.md)
    - [跨机房部署方案](op-guide/location-awareness.md)
  + 配置集群
    - [配置参数](op-guide/configuration.md)
  + 监控集群
    - [整体监控框架概述](op-guide/monitor-overview.md)
    - [重要监控指标详解](op-guide/dashboard-overview-info.md)
    - [组件状态 API & 监控](op-guide/monitor.md)
  - [扩容缩容](op-guide/horizontal-scale.md)
  + 升级
    - [使用 Ansible 升级](op-guide/ansible-deployment.md)
  + 性能调优
    - [TiKV 性能参数调优](op-guide/tune-tikv.md)
  + 备份与迁移
    - [备份与恢复](op-guide/backup-restore.md)
    + [数据迁移](op-guide/migration.md)
      - [全量导入](op-guide/migration.md#使用-mydumperloader-全量导入数据)
      - [增量导入](op-guide/migration.md#使用-syncer-增量导入数据)
  + 手动运维
    - [Binary 部署方案](op-guide/binary-deployment.md)
+ [TiDB 用户文档](sql/README.md)
  + TiDB 数据库管理
    - [TiDB 服务器启动参数](sql/server-command-option.md)
    - [TiDB 专用系统变量和语法](sql/tidb-specific.md)
  + TiDB 安全
    - [TiDB 访问权限管理](sql/privilege.md)
  + 优化
    - [理解 TiDB 执行计划](sql/understanding-the-query-execution-plan.md)
  + [数据类型](sql/datatype.md)
    - [数值类型](sql/datatype.md#数值类型)
    - [字符串类型](sql/datatype.md#字符串类型)
    - [数据类型默认值](sql/datatype.md#数据类型的默认值)
  + 函数与操作符
    - [操作符](sql/operators.md)
    - [日期和时间函数](sql/date-and-time-functions.md)
    - [位函数和操作符](sql/bit-functions-and-operators.md)
    - [Cast 函数和操作符](sql/cast-functions-and-operators.md)
    - [信息函数](sql/information-functions.md)
  + SQL 语句语法
    - [数据定义语句(DDL)](sql/ddl.md)
    - [数据操作语句(DML)](sql/dml.md)
    - [与 MySQL 兼容性对比](sql/mysql-compatibility.md)
    - [TiDB SQL 语法图](https://pingcap.github.io/sqlgram/)
  - [文档型数据库](sql/json-functions-generated-column.md)
+ 高级功能
  - [历史数据回溯](op-guide/history-read.md)
+ 工具
  - [Loader 使用文档](tools/loader.md)
  - [Syncer 使用文档](tools/syncer.md)
  - [TiDB-binlog 使用文档](op-guide/tidb-binlog.md)
  - [PD 命令行工具](op-guide/pd-control.md)
+ TiSpark 文档
  - [TiSpark 快速入门指南](op-guide/tispark-quick-start-guide.md)
  - [TiSpark 用户指南](op-guide/tispark-user-guide.md)
- [常见问题与解答](FAQ.md)
- [故障诊断](trouble-shooting.md)
- [最佳实践](https://pingcap.com/blog-TiDB-Best-Practice-zh)
+ 版本发布声明
  - [Pre-GA](releases/prega.md)
  - [RC4](releases/rc4.md)
  - [RC3](releases/rc3.md)
  - [RC2](releases/rc2.md)
  - [RC1](releases/rc1.md)
+ 更多资源
  - [PingCAP 团队技术博客](https://pingcap.com/bloglist-zh.html)
