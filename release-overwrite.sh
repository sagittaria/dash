if [ ! -d dist ];then
  echo "没发现dist文件夹！"
else
  echo "存在dist文件夹，正在删除..."
  rm dist -rf
  echo "dist文件夹已删除！"
fi

echo "开始构建..."
npm run build:prod
echo "构建完成！"

cd dist
echo ">>> 针对history模式部署到github.io后刷新404问题"
cp index.html 404.html
echo ">>> 已复制index.html并重命名为404.html！"

echo "前往kasoya.github.io清除旧版文件..."
cd ../../kasoya.github.io
rm static -rf
rm index.html
rm 404.html
rm favicon.ico
echo "旧版文件已清除！"

echo "正在复制新版文件..."
cp -r ../dash/dist/static static
cp ../dash/dist/index.html index.html
cp ../dash/dist/404.html 404.html
cp ../dash/dist/favicon.ico favicon.ico
echo "新版文件复制完毕！"

echo "正在提交变更..."
git add . > /dev/null 2>&1
git commit --amend -m `date '+%Y%m%d%H%M%S'` > /dev/null 2>&1
echo "变更提交完成！"

echo "正在发布..."
git push -f
echo "新版本发布完成！"

echo "正在清理dist文件夹..."
rm ../dash/dist -rf
echo "dist文件夹已清理！"