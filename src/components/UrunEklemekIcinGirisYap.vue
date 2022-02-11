<template>
    <div class="modal fade top" id="SepeteEklemekIcinGirisYap" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-full-height modal-top" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title w-100 d-flex justify-content-center" id="myModalLabel">Uyarı</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-center">Sepete ürün ekleyebilmek için giriş yapmanız lazım.</div>
                </div>
                <div class="modal-footer justify-content-center">
                    <button @click="$router.push({name: 'KaydolPage'})" type="button" class="btn btn-secondary" data-dismiss="modal">Kaydol</button>
                    <button @click="$router.push({name: 'GirisYapPage'})" type="button" class="btn btn-primary" data-dismiss="modal">Gİrİş yap</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .modal-body{
        font-size: 16px;
    }
    .modal-footer button{
        padding: 5px 7px;
        font-size: 13px;
    }
    .modal-body div{
        overflow: hidden;
        text-overflow: clip;
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>