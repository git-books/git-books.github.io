<div class="col-xs-12">
    <form class="form-horizontal" method="post">
      <div class="form-group">
        <label for="folder" class="col-sm-2 control-label">Folder</label>
        <div class="col-sm-10">
          <input type="text" class="form-control" id="folder" id="folder" placeholder="Book folder name" value="<?= $folder?>">
        </div>
      </div>
      <div class="form-group">
        <label for="config" class="col-sm-2 control-label">Config</label>
        <div class="col-sm-10">
          <textarea id="config" name="config" class="form-control" rows="25"><?= $config?></textarea>
        </div>
      </div>

      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-lg btn-primary"><i class="glyphicon glyphicon-send" aria-hidden="true"></i> Submit</button>
        </div>
      </div>
    </form>
</div>
